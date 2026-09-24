import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertHeader } from '../aler-header/alert-header';
import { AlertFilter } from '../alert-filter/alert-filter';
import { AlertStats } from '../alert-stats/alert-stats';
import { AlertPost } from '../alert-post/alert-post';
import { API_BASE } from '../config';

export interface PublicPost {
  _id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  image: { data: string; contentType: string } | null;
  createdAt: string;
}

@Component({
  selector: 'app-alert-page',
  standalone: true,
  imports: [CommonModule, AlertHeader, AlertFilter, AlertStats, AlertPost],
  templateUrl: './alert-page.html',
  styleUrl: './alert-page.css',
})
export class AlertPage implements OnInit {
  posts: PublicPost[] = [];
  localKey = 'local_public_posts';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{ success: boolean; posts: PublicPost[]; message: string }>(`${API_BASE}/api/public_posts`).subscribe({
      next: (response) => {
        if (response.success) {
          this.posts = response.posts;
        }
      },
      error: (err) => console.error('Failed to load public posts', err)
    });

    // Listen for cross-tab updates when admin accepts a report
    window.addEventListener('storage', (ev: StorageEvent) => {
      if (ev.key === 'posts-updated') {
        this.reloadPublicPosts();
      }
    });

    // load local posts from localStorage and prepend them after fetch
    try {
      const raw = window.localStorage.getItem(this.localKey);
      if (raw) {
        const localPosts = JSON.parse(raw) as PublicPost[];
        if (localPosts && localPosts.length) {
          // prepend local posts so they appear first
          this.posts = [...localPosts, ...this.posts];
        }
      }
    } catch (e) {
      console.warn('failed to load local posts', e);
    }
  }

  reloadPublicPosts() {
    this.http.get<{ success: boolean; posts: PublicPost[]; message: string }>(`${API_BASE}/api/public_posts`).subscribe({
      next: (response) => {
        if (response.success) {
          // preserve local posts on top
          const local = this.getLocalPosts();
          this.posts = [...local, ...response.posts];
        }
      },
      error: (err) => console.error('Failed to reload public posts', err)
    });
  }

  getLocalPosts(): PublicPost[] {
    try {
      const raw = window.localStorage.getItem(this.localKey);
      return raw ? (JSON.parse(raw) as PublicPost[]) : [];
    } catch (e) { return []; }
  }

  async addLocalPost(ev: Event) {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const fd = new FormData(form);
    const title = (fd.get('title') as string) || 'Untitled';
    const location = (fd.get('location') as string) || 'Unknown';
    const description = (fd.get('description') as string) || '';
    const file = fd.get('image') as File | null;

    let image = null;
    if (file && file.size) {
      image = { data: await this.readFileAsDataUrl(file), contentType: file.type } as any;
      // strip data: prefix to match server base64
      image = { data: (image.data as string).split(',')[1], contentType: file.type };
    }

    const newPost: PublicPost = {
      _id: 'local-' + Date.now(),
      title,
      description,
      location,
      status: 'New',
      image,
      createdAt: new Date().toISOString()
    };

    // save locally
    try {
      const local = this.getLocalPosts();
      local.unshift(newPost);
      window.localStorage.setItem(this.localKey, JSON.stringify(local));
      // update UI
      this.posts = [newPost, ...this.posts];
      form.reset();
    } catch (e) {
      console.error('Failed to save local post', e);
    }
  }

  readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }
}

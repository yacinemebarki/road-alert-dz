import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AlertPostData {
  _id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  image: { data: string; contentType: string } | null;
  createdAt: string;
}

@Component({
  selector: 'app-alert-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-post.html',
  styleUrl: './alert-post.css',
})
export class AlertPost {
  @Input() post: AlertPostData | null = null;

  get imageUrl(): string {
    if (!this.post?.image?.data) {
      return 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80';
    }

    return `data:${this.post.image.contentType};base64,${this.post.image.data}`;
  }

  get displayTime(): string {
    if (!this.post?.createdAt) {
      return 'just now';
    }

    const diff = Date.now() - new Date(this.post.createdAt).getTime();
    const hours = Math.max(1, Math.round(diff / 3600000));
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
}

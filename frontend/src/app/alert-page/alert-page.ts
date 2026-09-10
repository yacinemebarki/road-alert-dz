import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertHeader } from '../aler-header/alert-header';
import { AlertFilter } from '../alert-filter/alert-filter';
import { AlertStats } from '../alert-stats/alert-stats';
import { AlertPost } from '../alert-post/alert-post';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{ success: boolean; posts: PublicPost[]; message: string }>('http://localhost:3000/api/public_posts').subscribe({
      next: (response) => {
        if (response.success) {
          this.posts = response.posts;
        }
      },
      error: (err) => console.error('Failed to load public posts', err)
    });
  }
}

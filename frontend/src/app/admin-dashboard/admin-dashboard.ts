import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Stat, Report, Alert, ALerResponse } from '../interfaces/alers-response';
import { buildReportRows } from './admin-dashboard.logic';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  stats: Stat[] = [
    { icon: '📋', label: 'Total Reports', value: 0, iconClass: 'icon-blue' },
    { icon: '🆕', label: 'New', value: 0, iconClass: 'icon-blue' },
    { icon: '⏳', label: 'In Progress', value: 0, iconClass: 'icon-gray' },
    { icon: '✅', label: 'Resolved', value: 0, iconClass: 'icon-blue' },
    { icon: '❌', label: 'Broken', value: 0, iconClass: 'icon-blue' },
  ];

  reports: Report[] = [];

  constructor(private http: HttpClient) {}

  updateStats(alerts: Alert[]): void {
    const pendingAlerts = alerts.filter((alert) => ['New', 'Update'].includes(alert.view));
    const total = pendingAlerts.length;

    this.stats[0].value = total;
    this.stats[1].value = pendingAlerts.filter((alert) => alert.view === 'New').length;
    this.stats[2].value = pendingAlerts.filter((alert) => alert.post?.stauts === 'In Progress').length;
    this.stats[3].value = pendingAlerts.filter((alert) => ['Resolved', 'Fixed'].includes(alert.post?.stauts ?? '')).length;
    this.stats[4].value = pendingAlerts.filter((alert) => alert.post?.stauts === 'Broken').length;
  }

  getPosts(): void {
    this.http.get<ALerResponse>('http://localhost:3000/api/dashboard_posts').subscribe({
      next: (response) => {
        if (!response.success) {
          console.log(response.message);
          return;
        }

        this.reports = buildReportRows(response.alerts);
        this.updateStats(response.alerts);
      },
      error: (err) => console.error('Failed to load alerts', err)
    });
  }

  ngOnInit(): void {
    this.getPosts();
  }

  acceptReport(report: Report): void {
    const alertId = report.id;
    this.http.patch<{ success: boolean; message: string }>(`http://localhost:3000/api/alerts/${alertId}/accept`, {}).subscribe({
      next: (response) => {
        if (response.success) {
          this.getPosts();
        } else {
          console.log(response.message);
        }
      },
      error: (err) => console.error('Failed to accept alert', err)
    });
  }

  deleteReport(report: Report): void {
    const alertId = report.id;
    this.http.delete<{ success: boolean; message: string }>(`http://localhost:3000/api/alerts/${alertId}`).subscribe({
      next: (response) => {
        if (response.success) {
          this.getPosts();
        } else {
          console.log(response.message);
        }
      },
      error: (err) => console.error('Failed to delete alert', err)
    });
  }

  viewReport(report: Report): void {
    this.acceptReport(report);
  }
}


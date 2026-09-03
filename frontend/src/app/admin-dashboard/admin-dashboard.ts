import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Stat, Report, Alert, ALerResponse } from '../interfaces/alers-response';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard {
  stats: Stat[] = [
    { icon: '📋', label: 'Total Reports', value: 0, iconClass: 'icon-blue' },
    { icon: '🆕', label: 'New', value: 0, iconClass: 'icon-blue' },
    { icon: '⏳', label: 'In Progress', value: 0, iconClass: 'icon-gray' },
    { icon: '✅', label: 'Resolved', value: 0, iconClass: 'icon-blue' },
  ];

  reports: Report[] = [];

  constructor(private http: HttpClient){}

  getPosts(){
    return this.http.get<ALerResponse>('http://localhost:3000/api/dashboard_posts').subscribe({
      next: (response) => {
        if(!response.success){
          console.log(response.message);
          return;
        }

        this.reports = response.alerts.map( alert => ({
          id: alert.post._id,
          title: alert.post.title,
          wilaya: alert.post.location,
          status: "New",
          action: "View"
        }));
        this.stats[0].value = this.reports.length;
      }
    });
  }

}

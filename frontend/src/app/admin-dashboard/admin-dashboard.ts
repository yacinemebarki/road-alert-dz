import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Stat, Report, Alert, ALerResponse } from '../interfaces/alers-response';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard {
  stats: Stat[] = [
    { icon: '📋', label: 'Total Reports', value: 0, iconClass: 'icon-blue' },
    { icon: '🆕', label: 'New', value: 0, iconClass: 'icon-blue' },
    { icon: '⏳', label: 'In Progress', value: 0, iconClass: 'icon-gray' },
    { icon: '✅', label: 'Resolved', value: 0, iconClass: 'icon-blue' },
    { icon: '❌', label: 'Broken', value: 0, iconClass: 'icon-blue' },
  ];

  reports: Report[] = [];

  constructor(private http: HttpClient){}

  updateStats(alerts: Alert[]): void{
    const total = alerts.length;
    console.log(total);
    const newAlerts = alerts.filter(alert => alert.post.stauts == 'New').length;
    this.stats[0].value = total;
    this.stats[1].value = newAlerts;
    this.stats[2].value = alerts.filter(alert => alert.post.stauts == 'In Progress').length;
    this.stats[3].value = alerts.filter(alert => alert.post.stauts == 'Resolved' || alert.post.stauts == 'Fixed').length;
    this.stats[4].value = alerts.filter(alert => alert.post.stauts == 'Broken').length;
  }

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
          status: alert.post.stauts,
          action: alert.view
        }));
        this.updateStats(response.alerts);

      }
    });
  }

  ngOnInit() {
    this.getPosts();
  }

}

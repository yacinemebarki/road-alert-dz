import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  icon: string;
  label: string;
  value: number;
  iconClass: string;
}

interface Report {
  id: number;
  title: string;
  wilaya: string;
  status: 'New' | 'In Progress' | 'Resolved';
  action: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard {
  stats: Stat[] = [
    { icon: '📋', label: 'Total Reports', value: 128, iconClass: 'icon-blue' },
    { icon: '🆕', label: 'New', value: 12, iconClass: 'icon-blue' },
    { icon: '⏳', label: 'In Progress', value: 34, iconClass: 'icon-gray' },
    { icon: '✅', label: 'Resolved', value: 82, iconClass: 'icon-blue' },
  ];

  reports: Report[] = [
    { id: 1, title: 'Pothole on RN5', wilaya: 'Algiers', status: 'New', action: 'Review' },
    { id: 2, title: 'Broken guardrail', wilaya: 'Blida', status: 'In Progress', action: 'Assign' },
    { id: 3, title: 'Flooded underpass', wilaya: 'Oran', status: 'Resolved', action: 'View' },
  ];
}

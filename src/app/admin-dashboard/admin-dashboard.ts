import { Component } from '@angular/core';
import { AlertFilter } from '../alert-filter/alert-filter';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AlertFilter],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {}

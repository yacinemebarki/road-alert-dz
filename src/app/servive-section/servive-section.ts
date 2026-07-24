import { Component } from '@angular/core';
import { ServiceCard } from '../service-card/service-card';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-servive-section',
  imports: [ServiceCard],
  templateUrl: './servive-section.html',
  styleUrl: './servive-section.css',
})
export class ServiveSection {
  services = [
    {
      icon: 'bi bi-camera-fill',
      title: 'Instant Visual Reports',
      text: 'Capture a photo, tag the location, and send. Our AI categorizes the severity to alert teams instantly.',
      color: '#0d6efd'
    },
    {
      icon: 'bi bi-bell-fill',
      title: 'Live Status',
      text: 'Get push notifications when your report is assigned, reviewed, and eventually resolved by the wilaya teams.',
      color: '#28a745'
    },
    {
      icon: 'bi bi-bar-chart-line-fill',
      title: 'Impact Analytics',
      text: 'View the measurable difference your reports are making in your neighborhood through detailed monthly summaries.',
      color: '#ffc107'
    },
    {
      icon: 'bi bi-shield-lock-fill',
      title: 'Privacy First',
      text: 'Your identity is protected. We only share report data and location with technical teams, never your personal info.',
      color: 'white'
    }
  ];
}

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
      color: '#0F172A',
      text_color: '#EEF0FF',
      icon_color: '#283044'
    },
    {
      icon: 'bi bi-bell-fill',
      title: 'Live Status',
      text: 'Get push notifications when your report is assigned, reviewed, and eventually resolved by the wilaya teams.',
      color: '#fff',
      text_color: '#100f0f',
      icon_color: '#EEF0FF'
    },
    {
      icon: 'bi bi-bar-chart-line-fill',
      title: 'Impact Analytics',
      text: 'View the measurable difference your reports are making in your neighborhood through detailed monthly summaries.',
      color: '#ffff',
      text_color: '#100f0f',
      icon_color: '#EEF0FF'
    },
    {
      icon: 'bi bi-shield-lock-fill',
      title: 'Privacy First',
      text: 'Your identity is protected. We only share report data and location with technical teams, never your personal info.',
      color: '#2563EB',
      text_color: '#fff',
      icon_color: '#618BFF'
    }
  ];
}

import { Component } from '@angular/core';
import { AlertHeader } from '../aler-header/alert-header';
import { AlertFilter } from '../alert-filter/alert-filter';
import { AlertStats } from '../alert-stats/alert-stats';

@Component({
  selector: 'app-alert-page',
  imports: [AlertHeader, AlertFilter, AlertStats],
  templateUrl: './alert-page.html',
  styleUrl: './alert-page.css',
})
export class AlertPage { }

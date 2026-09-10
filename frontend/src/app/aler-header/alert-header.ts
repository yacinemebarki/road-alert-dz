import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alert-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './alert-header.html',
  styleUrl: './alert-header.css',
})
export class AlertHeader { }

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css',
})
export class ServiceCard {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() text!: string;
  @Input() color!: string;
  @Input() text_color!: string;
  @Input() icon_color!: string; 
}

import { Title } from '@angular/platform-browser';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-steps',
  imports: [],
  templateUrl: './steps.html',
  styleUrl: './steps.css',
})
export class Steps {
    @Input() current_step = 1;
}

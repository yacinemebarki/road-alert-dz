import { Component } from '@angular/core';
import { SignIn } from '../sign-in/sign-in';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-join-section',
  imports: [SignIn, RouterLink],
  templateUrl: './join-section.html',
  styleUrl: './join-section.css',
})
export class JoinSection {}

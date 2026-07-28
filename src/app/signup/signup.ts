import { Component } from '@angular/core';
import { Steps } from '../steps/steps';
import { PrivacyMessage } from '../privacy-message/privacy-message';

@Component({
  selector: 'app-signup',
  imports: [Steps, PrivacyMessage],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {}

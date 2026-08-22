import { Component } from '@angular/core';
import { Steps } from '../steps/steps';
import { PrivacyMessage } from '../privacy-message/privacy-message';
import { SignUpInputs } from '../sign-up-inputs/sign-up-inputs';
import { Verfication } from '../verfication/verfication';

@Component({
  selector: 'app-signup',
  imports: [Steps, PrivacyMessage, SignUpInputs, Verfication],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  current_step = 1;

  next_step(){
    this.current_step = 2;
  }
}

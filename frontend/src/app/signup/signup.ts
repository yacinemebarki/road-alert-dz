import { Component } from '@angular/core';
import { Steps } from '../steps/steps';
import { PrivacyMessage } from '../privacy-message/privacy-message';
import { SignUpInputs } from '../sign-up-inputs/sign-up-inputs';
import { Verfication } from '../verfication/verfication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [Steps, PrivacyMessage, SignUpInputs, Verfication],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  current_step = 1;
  email = '';

  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();

    if(navigation?.extras.state){
      this.current_step = navigation.extras.state['current_step'] ?? 1;
      this.email = navigation.extras.state['email'] ?? '';
    }

  }

  next_step(email: string){
    this.email = email;
    this.current_step = 2;
  }
}

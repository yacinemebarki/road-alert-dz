import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignUpResponse } from '../interfaces/signup-response';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  password = '';
  email = '';

  constructor(private http: HttpClient, private router: Router){}

  sign(){
    if(this.email == '' || this.password == ''){
      console.log("you should fill all fields");
      return;
    }

    const data = {
      email: this.email,
      password: this.password
    }

    this.http.post<SignUpResponse>('http://localhost:3000/api/sign_in', data).subscribe(resoponse => {
      if(!resoponse.success){
        console.log(resoponse.message);
        return
      }
      this.router.navigate(['/signup'], {
        state: { current_step: 2, email: this.email}
      })
    })
  }
}

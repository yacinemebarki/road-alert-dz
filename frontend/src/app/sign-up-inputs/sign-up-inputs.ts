import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUpResponse } from '../interfaces/signup-response';

@Component({
  selector: 'app-sign-up-inputs',
  imports: [FormsModule],
  templateUrl: './sign-up-inputs.html',
  styleUrl: './sign-up-inputs.css',
})
export class SignUpInputs {
  @Output() UpBtn =  new EventEmitter<string>();

  constructor(private http: HttpClient){}

  user_name = '';
  email = '';
  password = '';
  confirm_password = '';

  onVerify(){
    if(this.user_name == '' || this.email == '' || this.password == '' || this.confirm_password == ''){
      return;
    }

    if(this.password.length < 8){
      return;
    }

    if(this.password != this.confirm_password){
      return;
    }

    const data = {
      user_name: this.user_name,
      email: this.email,
      password: this.password
    }

    this.http.post<SignUpResponse>('http://localhost:3000/api/sign_up', data).subscribe(response => {
      if(response.success == false){
        console.log(response.message);
        return;
      }
      this.UpBtn.emit(this.email);

    });
    
  }
}

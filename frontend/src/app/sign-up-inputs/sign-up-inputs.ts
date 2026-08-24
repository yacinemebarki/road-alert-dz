import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-inputs',
  imports: [],
  templateUrl: './sign-up-inputs.html',
  styleUrl: './sign-up-inputs.css',
})
export class SignUpInputs {
  @Output() UpBtn =  new EventEmitter<void>();

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
    this.UpBtn.emit();

    const data = {
      user_name: this.user_name,
      email: this.email,
      password: this.password
    }

    this.http.post('http://localhost:3000/api/new_user', data).subscribe(response => {
      console.log(response);
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpResponse } from '../interfaces/signup-response';

@Component({
  selector: 'app-verfication',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verfication.html',
  styleUrl: './verfication.css',
})
export class Verfication {
  @Input() email = '';
  @Output() verfyBtn = new EventEmitter<string>();
  code = '';

  constructor(private http: HttpClient, private router: Router){}

  verfication(){
    if(this.code == ''){
      return;
    }
    console.log(this.email)
    const data = {
      email: this.email,
      user_code: this.code
    };
  
    this.http.post<SignUpResponse>('http://localhost:3000/api/verfy', data).subscribe(response => {
      if(!response.success){
        console.log(response.message);
        return;
      }
      console.log(response.message);
      this.router.navigate(['/alerts'], {
        state: {email: this.email}
      });      

    });

     
  }
}

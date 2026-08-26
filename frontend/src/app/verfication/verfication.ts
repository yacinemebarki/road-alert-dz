import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface SignUpResponse {
  success: boolean;
  message: string;
  email?: string;
}

@Component({
  selector: 'app-verfication',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './verfication.html',
  styleUrl: './verfication.css',
})
export class Verfication {
  @Input() email = '';
  @Output() verfyBtn = new EventEmitter<string>();
  code = '';

  constructor(private http: HttpClient){}

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
      this.verfyBtn.emit(this.email);      

    });

     
  }
}

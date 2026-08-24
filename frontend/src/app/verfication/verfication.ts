import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-verfication',
  imports: [],
  templateUrl: './verfication.html',
  styleUrl: './verfication.css',
})
export class Verfication {
  @Output() verfyBtn = new EventEmitter<void>();
  code = '';

  constructor(private http: HttpClient){}

  verfication(){
    if(this.code == ''){
      return;
    }

    const data = {
      code: this.code
    };
  
    this.http.post('http://localhost:3000/api/verfy', data);
    
     
  }
}

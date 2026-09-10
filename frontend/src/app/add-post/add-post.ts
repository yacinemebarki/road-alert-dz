import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpResponse } from '../interfaces/signup-response';
import { Location } from '@angular/common';



@Component({
  selector: 'app-add-post',
  imports: [FormsModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.css',
})
export class AddPost {
  title = '';
  description = '';
  location = '';
  image: File | null = null;

  constructor(private http: HttpClient, private router: Router, private nav: Location  ){
    // authentication handled by backend via httpOnly cookie; no email kept in frontend
  }

  uploadFile(){
    const uploadLink = document.getElementById('upload-link');
    const fileInput = document.getElementById('file-input');

    uploadLink?.addEventListener('click', () => {
      fileInput?.click();
    })

    fileInput?.addEventListener('change', (event) => {
      const input = event.target as HTMLInputElement;

      if(input.files && input.files.length > 0){
        this.image = input.files[0];
      }
    })
  }

  ngAfterViewInit(){
    this.uploadFile();
  }


  report(){
    if(this.title == '' || this.description == '' || this.location == '' || this.image == null){
      console.log("you must enter all information");
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('location', this.location);
    formData.append('image', this.image);

    this.http.post<SignUpResponse>('http://localhost:3000/api/add_post', formData, { withCredentials: true }).subscribe(response => {
      if(!response.success){
        console.log(response.message);
        return;
      }
      console.log(response.message);

    })
  }
  cancel(){
    this.nav.back();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-inputs',
  imports: [],
  templateUrl: './sign-up-inputs.html',
  styleUrl: './sign-up-inputs.css',
})
export class SignUpInputs {
  @Output() btn =  new EventEmitter<void>();

  onVerify(){
    this.btn.emit();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    
  }

  getEmailErrorMessage() {
    if (this.registerForm?.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerForm.get('email') ? 'Not a valid email' : '';
  }

  register() {
    this.authService.register(
      this.registerForm.get('userName')?.value,
      this.registerForm.get('email')?.value,
      this.registerForm.get('password')?.value
    ).subscribe(() => {
      console.log('register');
    });
  }

}

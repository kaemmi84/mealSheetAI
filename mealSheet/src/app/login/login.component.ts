import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(
      this.loginForm.get('userName')?.value,
      this.loginForm.get('password')?.value
    );
  }

}

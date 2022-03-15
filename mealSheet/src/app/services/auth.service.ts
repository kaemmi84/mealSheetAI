import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
const AUTH_API = 'http://localhost:8000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export const authConfig: AuthConfig = {

  tokenEndpoint: 'http://localhost:8000/o/token/',
  requireHttps: false,
  userinfoEndpoint: 'http://localhost:8000/users/',

  redirectUri: window.location.origin + '/home',

  clientId: 'kIVjYT1jEH3Q7BG6oJoqHaOB6MsG1EtrvBlUub04',

  dummyClientSecret: 'PYmzPdSs75iDJF8ZmOb64zhzp5x53ivOz9LEh0jhf5nWxWgJBZgErHCxcvTFcZW2RjZL9HONtOQCCodWfgBMLgIh91fHisrq5zqJNX4qKqFWVbGqy93Fis9Qrn4o4auQ',

  scope: 'read write groups',

  oidc: false,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private oauthService: OAuthService,
    private router: Router,
    ) { }
    
  login(username: string, password: string): any {
    this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password).then((resp: any) => {
      // let claims = this.oauthService.getIdentityClaims();
      // if (claims) console.debug('given_name', claims);
      //const resultArray = Object.keys(resp.info).map(index => resp.info[index]);
      //const currentUser =resultArray.find(user => user.username === username)
      //console.log('given_name', resp, resultArray, currentUser);
      this.router.navigate(['/home']);
    })
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register/', {
      username,
      email,
      password
    }, httpOptions);
  }
}

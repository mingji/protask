import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  constructor(private Token: TokenService, private router: Router) { }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  logout() {
    this.changeAuthStatus(false);
    this.Token.remove();
    this.router.navigateByUrl('/login');
  }

  

}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';



const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { 
  }


  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }




  public getToken(): string|null {
    return sessionStorage.getItem(TOKEN_KEY);
  }


  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public setUserId(id: string): void {
    window.sessionStorage.removeItem("usuarioId");
    window.sessionStorage.setItem("usuarioId", id);
  }

  public getUserId(): string | null {
    return sessionStorage.getItem("usuarioId");
  }


  public getUserName(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string | null {
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
        const authorities = JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!);
        if (authorities.length > 0) {
            return authorities[0].authority;
        }
    }
    return null;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }


  public estaAutenticado(): boolean {
    if(this.getToken() != null ){
      return true;
    }else{

      return false;
    }
  }

}

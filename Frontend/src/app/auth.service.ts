import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8081/api/';

  constructor(private http: HttpClient) { }


  public login(username: string, password: string) {
    return this.http.post<{token: string}>(`${this.API_URL}auth`, {username, password}).pipe(map(result => {
      if (result.token) {
        localStorage.setItem('token', result.token);
        return true;
      }
      return false;
    }));
  }


  public logout() {
    localStorage.removeItem('token');
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }


  public isAuthenicated(): boolean {
    const token = this.getToken();
    const helper = new JwtHelperService();

    return helper.isTokenExpired(token);
  }



}

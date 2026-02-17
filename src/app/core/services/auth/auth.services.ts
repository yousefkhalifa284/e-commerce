import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IsignUp } from '../../../shared/models/signUp/isign-up';
import { Ilogin } from '../../../shared/models/ilogin/ilogin';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {

  apiUrl: string = environment.apiUrl;
  constructor(private readonly http:HttpClient){}
  signup(data: any): Observable<IsignUp> {
    return this.http.post<IsignUp>(`${this.apiUrl}/auth/signup`, data);
  }

  login(data: any): Observable<Ilogin> {
    return this.http.post<Ilogin>(`${this.apiUrl}/auth/signin`, data);
  }


forgotPassword(data: any): Observable<any> {
  return this.http.post(environment.apiUrl + '/auth/forgotPasswords', data);
}

verifyCode(data: any): Observable<any> {
  return this.http.post(environment.apiUrl + '/auth/verifyResetCode', data);
}

resetPassword(data: any): Observable<any> {
  return this.http.put(environment.apiUrl + '/auth/resetPassword', data);
}
}

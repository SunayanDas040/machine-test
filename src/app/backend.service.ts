import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private _http: HttpClient) {}

  getApiToken(): string {
    const token = localStorage.getItem('accessToken');

    return `Bearer ${token}`;
  }

  getHeader(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `${this.getApiToken()}`,
    });

    return headers;
  }

  loginUser(payload: { email: string; password: string }) {
    return this._http.post(`${environment.baseUrl}auth/login`, payload);
  }

  getUserDetails() {
    const headers: HttpHeaders = this.getHeader();
    return this._http.get(`${environment.baseUrl}v1/users`, { headers });
  }

  logout() {
    const headers: HttpHeaders = this.getHeader();
    return this._http.get(`${environment.baseUrl}v1/users/logout`, { headers });
  }
}

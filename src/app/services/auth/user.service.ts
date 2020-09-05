import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const HOME_URL = 'http://localhost:8080/home';
const ADMIN_URL = 'http://localhost:8080/admin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(HOME_URL, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(ADMIN_URL, { responseType: 'text' });
  }
}
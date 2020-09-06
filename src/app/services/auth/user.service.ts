import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as global from 'src/global'

const HOME_URL = global.BACKEND_URL + '/home';
const ADMIN_URL = global.BACKEND_URL + '/admin';

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
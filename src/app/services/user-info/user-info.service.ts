import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/user-dto';
import * as global from 'src/global'

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private userUrl: string;

  constructor(private http: HttpClient) { 
    this.userUrl = global.BACKEND_URL + '/users';
  }

  public getOtherUsers():Observable<UserDTO[]> {
    var url = this.userUrl + "/getOtherUsers"
    return this.http.get<UserDTO[]>(url);
  }

}

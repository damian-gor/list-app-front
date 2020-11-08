import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { UserService } from 'src/app/services/auth/user.service';
import * as global from 'src/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  content: string;
  appVersion: string;

  constructor(
    private userService: UserService,
    private tokenStorageService: TokenStorageService) {
    this.appVersion = global.VERSION;
  }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
        $("#connecting-status-waiting").toggleClass("hidden");
        $("#connecting-status-success").toggleClass("hidden");
        $('#loading-spinner-home')[0].classList.add("hidden");
        if (this.tokenStorageService.getUser() == null) {
          $('#logInCommunicate-home')[0].classList.remove("hidden");
        }
      },
      err => {
        this.content = JSON.parse(err.error).message;
        $("#connecting-status-waiting").toggleClass("hidden");
        $("#connecting-status-failed").toggleClass("hidden");
        $('#loading-spinner-home')[0].classList.add("hidden");
      }
    );
  }

}

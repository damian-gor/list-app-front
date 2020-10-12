import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
        $("#connecting-status-waiting").toggleClass("hidden");
        $("#connecting-status-success").toggleClass("hidden");
      },
      err => {
        this.content = JSON.parse(err.error).message;
        $("#connecting-status-waiting").toggleClass("hidden");
        $("#connecting-status-failed").toggleClass("hidden");
      }
    );
  }

}

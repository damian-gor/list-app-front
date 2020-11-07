import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in-comunicate',
  templateUrl: './log-in-comunicate.component.html',
  styleUrls: ['./log-in-comunicate.component.scss']
})
export class LogInComunicateComponent implements OnInit {

  @Input() parentComponentName: String;

  constructor() { }

  ngOnInit(): void {
  }

}

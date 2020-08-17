import { Component, Output } from '@angular/core';
import { ProductCategory } from './models/enums/product-category.enum'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string;

  constructor () {
    this.title = 'list-app';
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product/product.service';
import { SharedService } from './services/sharedService/shared.service';
import { FormsModule } from '@angular/forms';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingListService } from './services/shoppingList/shopping-list.service';
import { ProductItemService } from './services/shoppingList/productItem/product-item.service';
import { ProductItemFormComponent } from './components/shopping-list/product-item-form/product-item-form.component';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductFormComponent,
    ShoppingListComponent,
    ProductItemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [ProductService, SharedService, ShoppingListService, ProductItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }

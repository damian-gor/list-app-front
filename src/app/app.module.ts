import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductFormComponent } from './components/products-list/product-form/product-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product/product.service';
import { SharedService } from './services/sharedService/shared.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingListService } from './services/shoppingList/shopping-list.service';
import { ProductItemService } from './services/shoppingList/productItem/product-item.service';
import { ProductItemFormComponent } from './components/shopping-list/product-item-form/product-item-form.component';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditItemModalComponent } from './components/modals/edit-item-modal/edit-item-modal.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { HomeComponent } from './components/home/home.component';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { AddProductModalComponent } from './components/modals/add-product-modal/add-product-modal.component';
import { ShoppingListsMenuComponent } from './components/shopping-lists-menu/shopping-lists-menu.component';
import { AddListModalComponent } from './components/modals/add-list-modal/add-list-modal.component';
import { ListFormComponent } from './components/shopping-lists-menu/list-form/list-form.component';
import { ConfirmDialogComponent } from './components/modals/confirm-dialog/confirm-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ShopsListComponent } from './components/shops-list/shops-list.component';
import { AddShopModalComponent } from './components/modals/add-shop-modal/add-shop-modal.component';
import { ShopFormComponent } from './components/shops-list/shop-form/shop-form.component';
import { ShopService } from './services/shop/shop.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LogInComunicateComponent } from './components/log-in-comunicate/log-in-comunicate.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductFormComponent,
    ShoppingListComponent,
    ProductItemFormComponent,
    EditItemModalComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    HomeComponent,
    AddProductModalComponent,
    ShoppingListsMenuComponent,
    AddListModalComponent,
    ListFormComponent,
    ConfirmDialogComponent,
    ShopsListComponent,
    AddShopModalComponent,
    ShopFormComponent,
    MenuToolbarComponent,
    LogInComunicateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatToolbarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule
  ],
  providers: [ProductService, SharedService, ShoppingListService, ProductItemService, ShopService, authInterceptorProviders],
  entryComponents: [EditItemModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

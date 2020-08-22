import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ProductItem } from 'src/app/models/product-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private shoppingListUrl: string;

  constructor(private http: HttpClient) { 
    this.shoppingListUrl = 'http://localhost:8080/shoppingList';
  }

  public getShoppingList():Observable<ShoppingList> {
    return this.http.get<ShoppingList>(this.shoppingListUrl);
  }

  public addProductItemToShoppingList(newProductItem: ProductItem, shoppingListId: number){
    var url = this.shoppingListUrl + "/addProductItemToList" + "?shoppingListId=" + shoppingListId;
    return this.http.put<ShoppingList>(url, newProductItem);
  }
  
  public updateProductItemInShoppingList(updatedProductItem: ProductItem, shoppingListId: number) {
    var url = this.shoppingListUrl + "/updateProductItemInList" + "?shoppingListId=" + shoppingListId;
    return this.http.patch<ShoppingList>(url, updatedProductItem);
  };

  public removeProductItemFromList(removedProductItem: ProductItem, shoppingListId: number) {
    var url = this.shoppingListUrl + "/removeProductItemFromList" + "?shoppingListId=" + shoppingListId;
    return this.http.patch(url, removedProductItem);
  };


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as global from 'src/global'
import { ShoppingListDTO } from 'src/app/models/shopping-list-dto';
import { ProductItemDTO } from 'src/app/models/product-item-dto';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private shoppingListUrl: string;

  constructor(private http: HttpClient) { 
    this.shoppingListUrl = global.BACKEND_URL + '/shoppingList';
  }

  public getShoppingList(shoppingListId: number):Observable<ShoppingListDTO> {
    var url = this.shoppingListUrl +  "/" + shoppingListId;
    return this.http.get<ShoppingListDTO>(url);
  }

  public deleteShoppingList(shoppingListId: number) {
    var url = this.shoppingListUrl +  "?shoppingListId=" + shoppingListId;
    return this.http.delete(url);
  }

  public addShoppingList(shoppingList: ShoppingListDTO):Observable<ShoppingListDTO> {
    return this.http.post<ShoppingListDTO>(this.shoppingListUrl, shoppingList);
  }

  public updateShoppingList (shoppingList: ShoppingListDTO):Observable<ShoppingListDTO> {
    return this.http.put<ShoppingListDTO>(this.shoppingListUrl, shoppingList);
  }
  
  
  public getAllShoppingLists():Observable<ShoppingListDTO[]> {
    return this.http.get<ShoppingListDTO[]>(this.shoppingListUrl);
  }
  
  public getShoppingListsByBuyerId (buyerId: number):Observable<ShoppingListDTO[]> {
    var url = this.shoppingListUrl +  "?buyerId=" + buyerId;
    return 
  }

  
  public addProductItemToShoppingList(newProductItemDTO: ProductItemDTO, shoppingListId: number){
    var url = this.shoppingListUrl + "/addProductItemToList" + "?shoppingListId=" + shoppingListId;
    return this.http.put<ShoppingListDTO>(url, newProductItemDTO);
  }
  
  public removeProductItemFromList(removedProductItemDTO: ProductItemDTO, shoppingListId: number) {
    var url = this.shoppingListUrl + "/removeProductItemFromList" + "?shoppingListId=" + shoppingListId;
    return this.http.patch(url, removedProductItemDTO);
  };


}

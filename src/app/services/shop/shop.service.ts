import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/models/shop';
import * as global from 'src/global'

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
  private shopUrl: string;

  constructor(private http: HttpClient) { 
    this.shopUrl = global.BACKEND_URL + '/shops';
  }

  public getAllShops():Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopUrl);
  }

  public getShop(shopId: number):Observable<Shop[]> {
    var url = this.shopUrl + "/" + shopId;
    return this.http.get<Shop[]>(url);
  }

  public addShop(shop:Shop):Observable<Shop> {
    return this.http.post<Shop>(this.shopUrl, shop);
  }

  public updateShop(shop:Shop):Observable<Shop> {
    return this.http.put<Shop>(this.shopUrl, shop);
  }

  public removeShop(shopId: number) {
    var url = this.shopUrl + "/" + shopId;
    return this.http.delete(url);
  }

  public filterShopsByName(shopName:string):Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopUrl + "/filterByName?shopName=" + shopName);
  }

}

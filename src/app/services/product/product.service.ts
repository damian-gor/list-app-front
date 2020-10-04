import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import * as global from 'src/global'

@Injectable()
export class ProductService {

  private productUrl: string;

  constructor(private http: HttpClient) { 
    this.productUrl = global.BACKEND_URL + '/products';
  }

  public getAllProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  public addProduct(product:Product) {
    return this.http.post<Product>(this.productUrl, product);
  }

  public updateProduct(product:Product) {
    return this.http.put<Product>(this.productUrl, product);
  }

  public filterProductsByName(name:string):Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl + "/filterByName?name=" + name);
  }

  public removeProduct(productId: number) {
    var url = this.productUrl + "/" + productId;
    return this.http.delete(url);
  };

}

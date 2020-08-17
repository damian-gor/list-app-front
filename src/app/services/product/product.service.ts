import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';


@Injectable()
export class ProductService {

  private productUrl: string;

  constructor(private http: HttpClient) { 
    this.productUrl = 'http://localhost:8080/products';
  }

  public getAllProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  public addProduct(product:Product) {
    return this.http.post<Product>(this.productUrl, product);
  }

}

import { Injectable } from '@angular/core';
import { ProductItem } from 'src/app/models/product-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductItemStatus } from 'src/app/models/enums/product-item-status.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  private productItemUrl: string;

  constructor(private http: HttpClient) { 
    this.productItemUrl = 'http://localhost:8080/productItem';
  }

  public addProductItem(productItem: ProductItem) {
    return this.http.post<ProductItem>(this.productItemUrl, productItem);
  }

  public deleteProductItem(productItemId: number) {
    var url = this.productItemUrl + "?productItemId=" + productItemId;
    return this.http.delete(url);
  }
}

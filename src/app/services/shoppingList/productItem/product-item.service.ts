import { Injectable } from '@angular/core';
import { ProductItem } from 'src/app/models/product-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductItemStatus } from 'src/app/models/enums/product-item-status.enum';
import * as global from 'src/global'
import { ProductItemDTO } from 'src/app/models/product-item-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  private productItemUrl: string;

  constructor(private http: HttpClient) { 
    this.productItemUrl = global.BACKEND_URL + '/productItem';
  }

  public addProductItem(productItem: ProductItemDTO) {
    return this.http.post<ProductItemDTO>(this.productItemUrl, productItem);
  }

  public deleteProductItem(productItemId: number) {
    var url = this.productItemUrl + "?productItemId=" + productItemId;
    return this.http.delete(url);
  }
}

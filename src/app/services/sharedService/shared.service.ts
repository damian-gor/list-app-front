import { Injectable } from '@angular/core';
import { ProductCategory } from '../../models/enums/product-category.enum'
import { ProductUnit } from '../../models/enums/product-unit.enum'


@Injectable()
export class SharedService {

  public productsCategoryMap: Map<String, String>;
  public productsUnitMap: Map<String, String>;

  constructor() {
    this.productsCategoryMap = new Map();
    Object.keys(ProductCategory).forEach(
      p => this.productsCategoryMap.set(p, ProductCategory[p])
    );

    this.productsUnitMap = new Map();
    Object.keys(ProductUnit).forEach(
      u => this.productsUnitMap.set(u, ProductUnit[u])
    );
  }
}

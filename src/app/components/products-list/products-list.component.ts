import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import { ProductCategory } from '../../models/enums/product-category.enum'
import { SharedService } from 'src/app/services/sharedService/shared.service';
import { ProductItemStatus } from 'src/app/models/enums/product-item-status.enum';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  productsCategoryMap: Map<String, String>;
  productsUnitMap: Map<String, String>;
  statuses : string[];


  constructor(private productService: ProductService,
    private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.productsCategoryMap = this.sharedService.productsCategoryMap;
    this.productsUnitMap = this.sharedService.productsUnitMap;
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
    this.statuses = Object.keys(ProductItemStatus);
  }

}

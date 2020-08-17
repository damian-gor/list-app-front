import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../../models/enums/product-category.enum';
import { SharedService } from '../../services/sharedService/shared.service';
import { ProductUnit } from 'src/app/models/enums/product-unit.enum';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  product: Product;
  productsCategoryMap: Map<String,String>;
  productCategoriesKeys = Object.keys(ProductCategory);
  productsUnitMap: Map<String,String>;
  productUnitsKeys = Object.keys(ProductUnit);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private sharedService: SharedService) { 
      this.product = new Product();
      // zaznaczy default w pickerze
      this.product.category = null;
      this.product.unit = null;
    }

	  onSubmit() {
      this.productService.addProduct(this.product).subscribe(result => this.gotoProductList());
    }
   
    gotoProductList() {
      this.router.navigate(['/products']);
    }

    ngOnInit() {
      this.productsCategoryMap = this.sharedService.productsCategoryMap;
      this.productsUnitMap = this.sharedService.productsUnitMap;
    }
}

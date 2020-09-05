import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../../../models/enums/product-category.enum';
import { SharedService } from '../../../services/sharedService/shared.service';
import { ProductUnit } from 'src/app/models/enums/product-unit.enum';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product;
  productsCategoryMap: Map<String, String>;
  productCategoriesKeys = Object.keys(ProductCategory);
  productsUnitMap: Map<String, String>;
  productUnitsKeys = Object.keys(ProductUnit);

  @Output() formSubmit: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private sharedService: SharedService) {
      this.resetProduct();
  }

  ngOnInit() {
    this.productsCategoryMap = this.sharedService.productsCategoryMap;
    this.productsUnitMap = this.sharedService.productsUnitMap;
  }

  onSubmit(form: NgForm) {
    this.product.name = form.value.name;
    this.product.category = form.value.category;
    this.product.unit = form.value.unit;

    this.productService.addProduct(this.product).subscribe(result => {
      this.formSubmit.emit(result);
      form.reset();
      this.resetProduct();
    }
    );
  }

  resetProduct() {
    this.product = new Product();
    this.product.category = null;
    this.product.unit = null;
  }
}

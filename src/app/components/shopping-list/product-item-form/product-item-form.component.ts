import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductItem } from 'src/app/models/product-item';
import { ProductUnit } from 'src/app/models/enums/product-unit.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../../../models/enums/product-category.enum';
import { SharedService } from 'src/app/services/sharedService/shared.service';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { ProductItemStatus } from 'src/app/models/enums/product-item-status.enum';
import { NgForm } from '@angular/forms';
import { ProductItemService } from 'src/app/services/shoppingList/productItem/product-item.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product';
import { ProductItemDTO } from 'src/app/models/product-item-dto';

@Component({
  selector: 'app-product-item-form',
  templateUrl: './product-item-form.component.html',
  styleUrls: ['./product-item-form.component.scss']
})
export class ProductItemFormComponent implements OnInit {

  @Input() productItem: ProductItemDTO;
  productsCategoryMap: Map<String, String>;
  productCategoriesKeys = Object.keys(ProductCategory);
  productsUnitMap: Map<String, String>;
  productUnitsKeys = Object.keys(ProductUnit);

  @Output() formSubmit: EventEmitter<ProductItemDTO> = new EventEmitter<ProductItemDTO>();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingListService: ShoppingListService,
    private productService: ProductService,
    private sharedService: SharedService,
    private productItemService: ProductItemService) {
    this.resetProductItem();
  }

  ngOnInit(): void {
    this.productsCategoryMap = this.sharedService.productsCategoryMap;
    this.productsUnitMap = this.sharedService.productsUnitMap;
  }

  onSubmit(form: NgForm) {
    this.productItem.name = form.value.name;
    this.productItem.quantity = form.value.quantity;
    this.productItem.category = form.value.category;
    this.productItem.unit = form.value.unit;

    if (form.value.ifAddToDb === true) {
      var product = new Product();
      product.name = this.productItem.name;
      product.category = this.productItem.category;
      product.unit = this.productItem.unit;
      this.productService.addProduct(product).subscribe(data => {
        this.productItem.sourceProductId = data.id;
        this.productItemService.addProductItem(this.productItem).subscribe(result => {
          this.formSubmit.emit(result);
          form.reset();
          this.resetProductItem();
        }
        );
      })
    } else {
      this.productItemService.addProductItem(this.productItem).subscribe(result =>
        this.formSubmit.emit(result));
      form.reset();
      this.resetProductItem();
    }
  }

  resetProductItem() {
    this.productItem = new ProductItemDTO();
    this.productItem.category = null;
    this.productItem.unit = null;
    this.productItem.ifAddToDb = false;
    this.productItem.productStatus = ProductItemStatus.IN_PROGRESS;
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

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

  searchedProductsControl = new FormControl();
  filteredProducts: any;
  isLoading = false;
  errorMsg: string;
  value: string = "";

  @Output() formSubmit: EventEmitter<ProductItemDTO> = new EventEmitter<ProductItemDTO>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingListService: ShoppingListService,
    private productService: ProductService,
    private sharedService: SharedService,
    private productItemService: ProductItemService,
    private http: HttpClient) {
    this.resetProductItem();
  }

  ngOnInit(): void {
    $('.mat-form-field').removeClass('mat-form-field');
    $('.mat-form-field-appearance-legacy').removeClass('mat-form-field-appearance-legacy');
    $('.mat-form-field-wrapper').removeClass('mat-form-field-wrapper');
    $('.mat-input-element').removeClass('mat-input-element');
    $(".mat-form-field-infix").attr("style","border: 0");
    $(function(){ 
      $(".mat-autocomplete-trigger").attr("placeholder", "Wprowadź nazwę produktu");
    }) 
    this.productsCategoryMap = this.sharedService.productsCategoryMap;
    this.productsUnitMap = this.sharedService.productsUnitMap;

    this.searchedProductsControl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredProducts = [];
          this.isLoading = true;
        }),
        switchMap(value =>
          this.productService.filterProductsByName(value).pipe(
            finalize(() => {
              this.isLoading = false;
              this.value = value;
            })
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.errorMsg = "Can not fetch data";
          this.filteredProducts = [];
        } else if (this.value != undefined && this.value.length > 2) {
          this.filteredProducts = [];
        } else {
          this.errorMsg = "";
          this.filteredProducts = data;
        }
      });

  }

  onSubmit(form: NgForm) {
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

  onDbProductSelected (selectedProductFromDB:Product) {
    this.productItem.name = selectedProductFromDB.name;
    this.productItem.category = selectedProductFromDB.category;
    this.productItem.unit = selectedProductFromDB.unit;
  }

}

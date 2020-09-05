import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import { ProductCategory } from '../../models/enums/product-category.enum'
import { SharedService } from 'src/app/services/sharedService/shared.service';
import { ProductItemStatus } from 'src/app/models/enums/product-item-status.enum';
import { MatDialog } from '@angular/material/dialog';
import { AddProductModalComponent } from '../modals/add-product-modal/add-product-modal.component';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  productsCategoryMap: Map<String, String>;
  productsUnitMap: Map<String, String>;
  statuses: string[];


  constructor(private productService: ProductService,
    private sharedService: SharedService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.productsCategoryMap = this.sharedService.productsCategoryMap;
    this.productsUnitMap = this.sharedService.productsUnitMap;
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
    this.statuses = Object.keys(ProductItemStatus);
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '580px',
      data: {
        dialogTitle: "Dodaj produkt do bazy"
      }
    })

    dialogRef.afterClosed().subscribe(newProduct => {
      if (newProduct) {
        this.products.push(newProduct);
      }
    });
  }

  // editElement(event, oldProductItem: ProductItem) {

  //   var productItemTemplate = new ProductItem();
  //   productItemTemplate.category = oldProductItem.category;
  //   productItemTemplate.name = oldProductItem.name;
  //   productItemTemplate.quantity = oldProductItem.quantity;
  //   productItemTemplate.unit = oldProductItem.unit;

  //   const dialogRef = this.dialog.open(EditItemModalComponent, {
  //     width: '580px',
  //     data: {
  //       productItem: productItemTemplate,
  //       dialogTitle: "Edytuj element: " + productItemTemplate.name
  //     }
  //   })

  //   dialogRef.afterClosed().subscribe(updatedProductItem => {
  //     if (updatedProductItem) {
  //       oldProductItem.name = updatedProductItem.name;
  //       oldProductItem.quantity = updatedProductItem.quantity;
  //       oldProductItem.category = updatedProductItem.category;
  //       oldProductItem.unit = updatedProductItem.unit;
  //       this.checkAvailableCategoriesBtns();
  //     }
  //   });
  // }

}

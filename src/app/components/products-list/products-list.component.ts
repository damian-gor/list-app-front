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

  removeProduct(product: Product) {
    this.productService.removeProduct(product.id)
      .subscribe((response) => {
        this.products.splice(this.products.indexOf(product), 1);
      }
      );
  };

  editProduct(oldProduct: Product) {
    var productTemplate = new Product();
    productTemplate.category = oldProduct.category;
    productTemplate.name = oldProduct.name;
    productTemplate.unit = oldProduct.unit;
    productTemplate.id = oldProduct.id;

    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '580px',
      data: {
        product: productTemplate,
        dialogTitle: "Edytuj element: " + productTemplate.name
      }
    })

    dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
        oldProduct.name = updatedProduct.name;
        oldProduct.category = updatedProduct.category;
        oldProduct.unit = updatedProduct.unit;
      }
    });
  }

}

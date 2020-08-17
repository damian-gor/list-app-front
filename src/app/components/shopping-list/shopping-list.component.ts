import { Component, OnInit, Input } from '@angular/core';
import { ShoppingList } from '../../models/shopping-list'
import { SharedService } from 'src/app/services/sharedService/shared.service';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { ProductItem } from 'src/app/models/product-item';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  shoppingList: ShoppingList;
  productsCategoryMap: Map<String, String>;
  productsUnitMap: Map<String, String>;
  @Input() addedProductItem: ProductItem;
  productsList: ProductItem[] = new Array<ProductItem>();
  
  constructor(private shoppingListService: ShoppingListService,
    private sharedService: SharedService) { 
    }

  ngOnInit(): void {
    this.productsCategoryMap = this.sharedService.productsCategoryMap;
    this.productsUnitMap = this.sharedService.productsUnitMap;
    this.shoppingListService.getShoppingList().subscribe(data => {
      this.shoppingList = data;
      this.productsList = this.shoppingList.productsList;
    });
  }

  addProductItem(newProductItem: ProductItem){
    this.shoppingListService.addProductItemToShoppingList(newProductItem, this.shoppingList.id)
    .subscribe(result => this.productsList = result.productsList);
  }

}

import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ShoppingList } from '../../models/shopping-list'
import { SharedService } from 'src/app/services/sharedService/shared.service';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { ProductItem } from 'src/app/models/product-item';
import { ProductCategory } from 'src/app/models/enums/product-category.enum';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../modals/edit-item-modal/edit-item-modal.component';
import { ProductItemStatus } from 'src/app/models/enums/product-item-status.enum';
import { ProductItemService } from 'src/app/services/shoppingList/productItem/product-item.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  @Input() private uploadSuccess: EventEmitter<String>;
  @Input() selectedListId: any;
  shoppingList: ShoppingList;
  productsCategoryMap: Map<String, String>;
  productsUnitMap: Map<String, String>;
  addedProductItem: ProductItem;
  productsList: ProductItem[] = new Array<ProductItem>();
  productCategoriesKeys = Object.keys(ProductCategory);
  selectedCategoriesList: String[] = new Array<String>();
  availavleCategories: String[] = new Array<String>();


  constructor(private shoppingListService: ShoppingListService,
    private sharedService: SharedService,
    private productItemService: ProductItemService,
    public dialog: MatDialog) {
    this.productsCategoryMap = this.sharedService.productsCategoryMap;
    this.productsUnitMap = this.sharedService.productsUnitMap;
  }
  
  
  ngOnInit(): void {
    console.log(this.selectedListId)
    if (this.uploadSuccess) {
      this.uploadSuccess.subscribe(data => {
        this.shoppingListService.getShoppingList(data).subscribe(data => {
          this.shoppingList = data;
          this.productsList = this.shoppingList.productsList;
          this.checkAvailableCategoriesBtns();
        });
      });
    }

  };

  addProductItem(newProductItem: ProductItem) {
    this.shoppingListService.addProductItemToShoppingList(newProductItem, this.selectedListId)
      .subscribe(result => {
        this.productsList.push(result.productsList[result.productsList.length - 1]);
        this.checkAvailableCategoriesBtns();
      });
  };

  toggleAllCategories() {
    if (this.checkIfAnyCategorySelected()) {
      $("#allCategoriesBtn").toggleClass(["btn-success", "btn-light"])
      if ($("#allCategoriesBtn").hasClass("btn-success")) { //zaznaczenie widocznosci wszystkich kategorii
        $("#category-buttons .btn").toArray().forEach(btn => btn.classList.replace("btn-primary", "btn-light"));
        $("#shopping-list-table li").toArray().forEach(item => {
          if (item.hidden) item.hidden = false;
        });
      }
    }
  };


  checkIfAnyCategorySelected(): boolean { // true -> gdy ktorakolwiek kategoria zaznaczona
    var isAnySelected = false;
    $("#category-buttons .btn").toArray().forEach(btn => {
      if (btn.classList.contains("btn-primary"))
        isAnySelected = true;
    });
    return isAnySelected;
  };

  filterByCategory(event) {
    var clickedBtnClasses = event.target.classList;
    var clickedCategoryEnum = event.target.id;

    // jeśli żadna kategoria nie jest zaznaczona
    if (!this.checkIfAnyCategorySelected()) {
      clickedBtnClasses.replace("btn-light", "btn-primary");
      $("#allCategoriesBtn").toggleClass(["btn-success", "btn-light"]);

      $("#shopping-list-table li").toArray().forEach(item => {
        if (!item.classList.contains(clickedCategoryEnum)) {
          item.hidden = true;
        }
      });
    } else {   // jeśli któraś kategoria jest już zaznaczona
      if (clickedBtnClasses.contains("btn-primary")) {     // odznaczenie jakiejs kategorii

        clickedBtnClasses.replace("btn-primary", "btn-light");

        if (!this.checkIfAnyCategorySelected()) { // jeśli kliknięcie spowodowało odznaczenie ostatniej kategorii

          $("#allCategoriesBtn").toggleClass(["btn-success", "btn-light"])
          $("#shopping-list-table li").toArray().forEach(item => {
            if (item.hidden) item.hidden = false;
          });
        } else {
          $("#shopping-list-table li").toArray().forEach(item => {
            if (item.classList.contains(clickedCategoryEnum) && !item.hidden) {
              item.hidden = true;
            }
          })
        }
      }
      else {     // zaznaczenie jakiejs kategorii
        clickedBtnClasses.replace("btn-light", "btn-primary");
        if ($("#allCategoriesBtn").hasClass("btn-success"))
          $("#allCategoriesBtn").toggleClass(["btn-success", "btn-light"]);

        $("#shopping-list-table li").toArray().forEach(item => {
          if (item.classList.contains(clickedCategoryEnum) && item.hidden) {
            item.hidden = false;
          }
        });
      }
    }
  }

  checkAvailableCategoriesBtns() {
    this.availavleCategories = [];
    if ($("#toggleRealisedBtn").hasClass("btn-success")) {
      this.productsList.forEach(p => {
        if (p.productStatus == ProductItemStatus.IN_PROGRESS && !this.availavleCategories.includes(p.category))
          this.availavleCategories.push(p.category);
      });
    } else {
      this.productsList.forEach(p => {
        if (!this.availavleCategories.includes(p.category)) this.availavleCategories.push(p.category);
      });
    }

    $("#category-buttons .btn").toArray().forEach(btn => {
      if (this.availavleCategories.includes(btn.id)) {
        btn.hidden = false;
      } else {
        btn.hidden = true;
      }
    });
  }

  setAsBought(event, productItem: ProductItem) {
    productItem.productStatus != ProductItemStatus.BOUGHT ?
      productItem.productStatus = ProductItemStatus.BOUGHT : productItem.productStatus = ProductItemStatus.IN_PROGRESS;

    this.updateProductItemStatusInShoppingList(productItem);
  };

  setAsNotAvailable(event, productItem: ProductItem) {
    productItem.productStatus != ProductItemStatus.NOT_AVAILABLE ?
      productItem.productStatus = ProductItemStatus.NOT_AVAILABLE : productItem.productStatus = ProductItemStatus.IN_PROGRESS;

    this.updateProductItemStatusInShoppingList(productItem);
  };

  removeElement(event, productItem: ProductItem) {
    // modal 'are U sure'
    this.shoppingListService.removeProductItemFromList(productItem, this.selectedListId)
      .subscribe(response => {
        this.productsList.splice(this.productsList.indexOf(productItem), 1);
        this.checkAvailableCategoriesBtns();
      }
      );
  };

  editElement(event, oldProductItem: ProductItem) {

    var productItemTemplate = new ProductItem();
    productItemTemplate.category = oldProductItem.category;
    productItemTemplate.name = oldProductItem.name;
    productItemTemplate.quantity = oldProductItem.quantity;
    productItemTemplate.unit = oldProductItem.unit;

    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: {
        productItem: productItemTemplate,
        dialogTitle: "Edytuj element: " + productItemTemplate.name
      }
    })

    dialogRef.afterClosed().subscribe(updatedProductItem => {
      if (updatedProductItem) {
        oldProductItem.name = updatedProductItem.name;
        oldProductItem.quantity = updatedProductItem.quantity;
        oldProductItem.category = updatedProductItem.category;
        oldProductItem.unit = updatedProductItem.unit;
        this.checkAvailableCategoriesBtns();
      }
    });
  }

  addElement() {
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: {
        dialogTitle: "Dodaj produkt do listy"
      }
    })

    dialogRef.afterClosed().subscribe(newProductItem => {
      if (newProductItem) this.addProductItem(newProductItem)
    });
  }

  toggleRealisedProductItems() {
    $("#toggleRealisedBtn").toggleClass(["btn-success", "btn-light"])
    if ($("#toggleRealisedBtn").hasClass("btn-success")) {
      $("#shopping-list-table li").toArray().forEach(item => {
        if (item.classList.contains("bought") || item.classList.contains("not-available"))
          item.classList.add("hidden");
      });
    } else {
      $("#shopping-list-table li").toArray().forEach(item => {
        if (item.classList.contains("bought") || item.classList.contains("not-available"))
          item.classList.remove("hidden");
      });
    }
    this.checkAvailableCategoriesBtns();
  }

  // Pomocnicza: zaktualizowanie statutsu elementu z liście w DB
  updateProductItemStatusInShoppingList(updatedProductItem: ProductItem) {
    this.productItemService.addProductItem(updatedProductItem)
      .subscribe(() => {
        if (updatedProductItem.productStatus != ProductItemStatus.IN_PROGRESS &&
          $("#toggleRealisedBtn").hasClass("btn-success"))
          $('#' + updatedProductItem.id).addClass("hidden");
        this.checkAvailableCategoriesBtns();
      })
  };
}


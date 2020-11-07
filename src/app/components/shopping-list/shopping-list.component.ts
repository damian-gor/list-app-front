import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/sharedService/shared.service';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { ProductItem } from 'src/app/models/product-item';
import { ProductCategory } from 'src/app/models/enums/product-category.enum';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../modals/edit-item-modal/edit-item-modal.component';
import { ProductItemStatus } from 'src/app/models/enums/product-item-status.enum';
import { ProductItemService } from 'src/app/services/shoppingList/productItem/product-item.service';
import { ShoppingListDTO } from 'src/app/models/shopping-list-dto';
import { ProductItemDTO } from 'src/app/models/product-item-dto';
import { PdfService } from 'src/app/services/pdf/pdf.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  @Input() private uploadSuccess: EventEmitter<String>;
  @Input() selectedListId: any;
  shoppingList: ShoppingListDTO;
  productsCategoryMap: Map<String, String>;
  productsUnitMap: Map<String, String>;
  addedProductItem: ProductItemDTO;
  productsList: ProductItemDTO[] = new Array<ProductItemDTO>();
  productCategoriesKeys = Object.keys(ProductCategory);
  selectedCategoriesList: String[] = new Array<String>();
  availavleCategories: String[] = new Array<String>();
  isZakupyMode:boolean = false;


  constructor(private shoppingListService: ShoppingListService,
    private sharedService: SharedService,
    private productItemService: ProductItemService,
    public dialog: MatDialog,
    private pdfService: PdfService) {
    this.productsCategoryMap = this.sharedService.productsCategoryMap;
    this.productsUnitMap = this.sharedService.productsUnitMap;
  }
  
  
  ngOnInit(): void {

    if (this.uploadSuccess) {
      this.uploadSuccess.subscribe(data => {
        this.shoppingListService.getShoppingList(data).subscribe(data => {
          this.shoppingList = data;
          this.productsList = this.shoppingList.productsList;
          this.checkAvailableCategoriesBtns();
          $('#loading-spinner-child')[0].classList.add("hidden");
          $('#app-shopping-list')[0].classList.remove("hidden");
        });
      });
    }
  };

  addProductItem(newProductItem: ProductItemDTO) {
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

  setAsBought(event, productItemDTO: ProductItemDTO) {
    productItemDTO.productStatus != ProductItemStatus.BOUGHT ?
    productItemDTO.productStatus = ProductItemStatus.BOUGHT : productItemDTO.productStatus = ProductItemStatus.IN_PROGRESS;

    this.updateProductItemStatusInShoppingList(productItemDTO);
  };

  setAsNotAvailable(event, productItemDTO: ProductItemDTO) {
    productItemDTO.productStatus != ProductItemStatus.NOT_AVAILABLE ?
    productItemDTO.productStatus = ProductItemStatus.NOT_AVAILABLE : productItemDTO.productStatus = ProductItemStatus.IN_PROGRESS;

    this.updateProductItemStatusInShoppingList(productItemDTO);
  };

  removeElement(productItemDTO: ProductItemDTO) {
    this.shoppingListService.removeProductItemFromList(productItemDTO, this.selectedListId)
      .subscribe(response => {
        this.productsList.splice(this.productsList.indexOf(productItemDTO), 1);
        this.checkAvailableCategoriesBtns();
      }
      );
  };

  editElement(oldProductItem: ProductItemDTO) {

    var productItemTemplate = new ProductItem();
    productItemTemplate.category = oldProductItem.category;
    productItemTemplate.name = oldProductItem.name;
    productItemTemplate.quantity = oldProductItem.quantity;
    productItemTemplate.unit = oldProductItem.unit;
    productItemTemplate.id = oldProductItem.id;

    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: {
        productItem: productItemTemplate,
        dialogTitle: "Edytuj element: " + productItemTemplate.name
      }
    })

    dialogRef.afterClosed().subscribe(updatedProductItemDTO => {
      if (updatedProductItemDTO) {
        oldProductItem.name = updatedProductItemDTO.name;
        oldProductItem.quantity = updatedProductItemDTO.quantity;
        oldProductItem.category = updatedProductItemDTO.category;
        oldProductItem.unit = updatedProductItemDTO.unit;

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

    dialogRef.afterClosed().subscribe(newProductItemDTO => {
      if (newProductItemDTO) this.addProductItem(newProductItemDTO)
    });
  }

  toggleRealisedProductItems() {
    $("#toggleRealisedBtn").toggleClass(["btn-success", "btn-light"]);
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

  toggleAuthor() {
    $("#toggleAuthorBtn").toggleClass(["btn-success", "btn-light"]);
    if ($("#toggleAuthorBtn").hasClass("btn-success")) { // ukrywamy autora
      $('.productItemAuthor').toArray().forEach(a => a.classList.add("hidden"));
    } else { // pokazujemy
      $('.productItemAuthor').toArray().forEach(a => a.classList.remove("hidden"));
    }
  }

  // Pomocnicza: zaktualizowanie statutsu elementu z liście w DB
  updateProductItemStatusInShoppingList(updatedProductItemDTO: ProductItemDTO) {
    this.productItemService.addProductItem(updatedProductItemDTO)
      .subscribe(() => {
        if (updatedProductItemDTO.productStatus != ProductItemStatus.IN_PROGRESS &&
          $("#toggleRealisedBtn").hasClass("btn-success"))
          $('#' + updatedProductItemDTO.id).addClass("hidden");
        this.checkAvailableCategoriesBtns();
      })
  };

  getPdf() {
    this.pdfService.getListPdf(this.shoppingList.id);
    console.log('btn dziala');
  }

}


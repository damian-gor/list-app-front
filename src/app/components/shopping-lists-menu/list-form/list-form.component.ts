import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingListDTO } from 'src/app/models/shopping-list-dto';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { FormControl, NgForm } from '@angular/forms';
import { Shop } from 'src/app/models/shop';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {

  @Input() list: ShoppingListDTO;
  @Output() formSubmit: EventEmitter<ShoppingListDTO> = new EventEmitter<ShoppingListDTO>();

  searchedShopsControl = new FormControl();
  isLoading = false;
  filteredShops: any;
  errorMsg: string;
  value: string = "";

  constructor(private shoppingListService: ShoppingListService,
    private shopService: ShopService) { this.resetList() }

  ngOnInit(): void {
    $('.mat-form-field').removeClass('mat-form-field');
    $('.mat-form-field-appearance-legacy').removeClass('mat-form-field-appearance-legacy');
    $('.mat-form-field-wrapper').removeClass('mat-form-field-wrapper');
    $('.mat-input-element').removeClass('mat-input-element');
    $(".mat-form-field-infix").attr("style", "border: 0");
    $(function () {
      $(".mat-autocomplete-trigger").attr("placeholder", "Wprowadź nazwę sklepu");
    })

    this.searchedShopsControl.valueChanges
      .pipe(
        debounceTime(500),
        filter(value => value),
        filter(value => value.length >= 1),
        tap(() => {
          this.errorMsg = "";
          this.filteredShops = [];
          this.isLoading = true;
        }),
        switchMap(value =>
          this.shopService.filterShopsByName(value).pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.errorMsg = "Can not fetch data";
          this.filteredShops = [];
        } else {
          this.errorMsg = "";
          this.filteredShops = data;
        }
      });
  }

  onSubmit(form: NgForm) {
    if (this.list.id == null)
      this.shoppingListService.addShoppingList(this.list).subscribe(result => {
        this.formSubmit.emit(result);
        form.reset();
        this.resetList();
      }); else {
      this.formSubmit.emit(this.list);
      this.shoppingListService.updateShoppingList(this.list).subscribe(result => {
        this.formSubmit.emit(result);
        form.reset();
        this.resetList();
      });
    }
  }

  resetList() {
    this.list = new ShoppingListDTO();
  }

  onDbShopSelected(selectedShopFromDB: Shop) {
    this.list.shopName = selectedShopFromDB.name;
    this.list.shopPromotionUrl = selectedShopFromDB.promotionUrl;
  }
}

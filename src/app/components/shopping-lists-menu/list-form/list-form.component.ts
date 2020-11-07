import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingListDTO } from 'src/app/models/shopping-list-dto';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { FormControl, NgForm } from '@angular/forms';
import { Shop } from 'src/app/models/shop';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { ShopService } from 'src/app/services/shop/shop.service';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { UserDTO } from 'src/app/models/user-dto';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
  users: UserDTO[];
  selectedParticipants: UserDTO[];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private shoppingListService: ShoppingListService,
    private shopService: ShopService,
    private userInfoService: UserInfoService) {
    this.resetList();
    userInfoService.getOtherUsers().subscribe(data => {
      this.users = data;
      this.selectedItems = this.list.participantsList;
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'userId',
        textField: 'userName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: false
      };
    });
  }

  ngOnInit(): void {
    this.userInfoService.getOtherUsers().subscribe(data => this.users = data);
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
    this.list.participantsList = form.value.selectedParticipants;
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
    this.list.participantsList = [];
  }

  onDbShopSelected(selectedShopFromDB: Shop) {
    this.list.shopName = selectedShopFromDB.name;
    this.list.shopPromotionUrl = selectedShopFromDB.promotionUrl;
  }

  cancel() {
    this.formSubmit.emit(null);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Shop } from '../../models/shop';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../modals/confirm-dialog/confirm-dialog.component'
import { ShopService } from '../../services/shop/shop.service';
import { AddShopModalComponent } from '../modals/add-shop-modal/add-shop-modal.component';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.scss']
})
export class ShopsListComponent implements OnInit {

  shops: Shop[] = [];

  constructor(private shopService: ShopService,
    private dialog: MatDialog,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser() == null) {
      $('#logInCommunicate-shops')[0].classList.remove("hidden");
    } else {
      $('#loading-spinner-shops')[0].classList.remove("hidden");
      this.shopService.getAllShops().subscribe(result => {
        this.shops = result;
        $('#loading-spinner-shops')[0].classList.add("hidden");
        $('#app-shops-list')[0].classList.remove("hidden");
      });
    }
  }

  getAllShops() {
    this.shopService.getAllShops().subscribe(result => {
      if (result.length > 0) {
        this.shops = result;
      }
    });
  }

  addShop() {
    const dialogRef = this.dialog.open(AddShopModalComponent, {
      width: '580px',
      data: {
        dialogTitle: "Dodaj sklep do bazy"
      }
    })

    dialogRef.afterClosed().subscribe(newShop => {
      if (newShop) {
        this.shops.push(newShop);
      }
    });
  }

  editShop(oldShop: Shop) {
    var shopTemplate = new Shop();
    shopTemplate.id = oldShop.id;
    shopTemplate.name = oldShop.name;
    shopTemplate.promotionUrl = oldShop.promotionUrl;

    const dialogRef = this.dialog.open(AddShopModalComponent, {
      width: '580px',
      data: {
        shop: shopTemplate,
        dialogTitle: "Edytuj element: " + shopTemplate.name
      }
    })

    dialogRef.afterClosed().subscribe(updatedShop => {
      if (updatedShop) {
        oldShop.name = updatedShop.name;
        oldShop.promotionUrl = updatedShop.promotionUrl;
      }
    });
  }

  removeShop(shop: Shop) {

    var komunikat = "Czy na pewno chcesz usunąć sklep?";

    if (shop.shoppingLists.length != 0) {
      var shoppingListsIds = "";
      shop.shoppingLists.forEach(shoppingList => {
        if (shoppingListsIds.length > 0) shoppingListsIds += " ";
        shoppingListsIds += shoppingList.id;
      })

      komunikat += "\nUwaga! Sklep przypisany jest do aktywnych list zakupów. Jego usunięcie spowoduje także usunięcie list zakupów o id: " + shoppingListsIds + ".";
    }

    const dialogData = new ConfirmDialogModel("Usuń sklep o nazwie: " + shop.name, komunikat);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shopService.removeShop(shop.id)
          .subscribe(() => {
            this.shops.splice(this.shops.indexOf(shop), 1);
          });
      }
    });
  }

  gazetkaRedirection(shop: Shop) {
    window.open(shop.promotionUrl);
  }
}

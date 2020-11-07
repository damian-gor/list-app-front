import { Component, OnInit, EventEmitter } from '@angular/core';
import { ShoppingListDTO } from '../../models/shopping-list-dto'
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { MatDialog } from '@angular/material/dialog';
import { AddListModalComponent } from '../modals/add-list-modal/add-list-modal.component'
import { ConfirmDialogComponent, ConfirmDialogModel } from '../modals/confirm-dialog/confirm-dialog.component'
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';

@Component({
  selector: 'app-shopping-lists-menu',
  templateUrl: './shopping-lists-menu.component.html',
  styleUrls: ['./shopping-lists-menu.component.scss']
})
export class ShoppingListsMenuComponent implements OnInit {

  uploadSuccess: EventEmitter<String> = new EventEmitter();

  selectedShoppingList: ShoppingListDTO;
  selectedListId: any;
  lists: ShoppingListDTO[] = new Array<ShoppingListDTO>();

  constructor(private shoppingListService: ShoppingListService,
    public dialog: MatDialog,
    private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser() == null) {
      $('#logInCommunicate-lists')[0].classList.remove("hidden");
    } else {
      $('#app-shopping-lists')[0].classList.remove("hidden");
      this.getAllShoppingLists();
    }

  }

  getAllShoppingLists() {
    this.shoppingListService.getAllShoppingLists().subscribe(result => {
      if (result.length > 0) {
        this.lists = result;
        if (this.lists[0].buyer.userName == this.tokenStorageService.getUser().username) {
          $('#deleteListBtn')[0].classList.remove("hidden");
          $('#edit-list-btn')[0].classList.remove("hidden");
        }
      }
      else {
        $('#noListsAvailableOption')[0].classList.remove("hidden");
        $('#listId').val(0);
      }
    });
  }

  loadList() {
    this.selectedListId = $('#listId').children("option:selected").val();
    this.uploadSuccess.emit(this.selectedListId);
    $('#shopping-list-container').removeAttr("hidden");
  }

  editList() {
    var oldList: ShoppingListDTO;
    this.lists.forEach(l => {
      if (l.id == $('#listId').children("option:selected").val()) oldList = l;
    })

    var listTemplate = new ShoppingListDTO();
    listTemplate.shopName = oldList.shopName;
    listTemplate.id = oldList.id;
    listTemplate.participantsList = oldList.participantsList;
    listTemplate.shopPromotionUrl = oldList.shopPromotionUrl;

    const dialogRef = this.dialog.open(AddListModalComponent, {
      width: '580px',
      data: {
        list: listTemplate,
        dialogTitle: "Edytuj listę: " + listTemplate.id
      }
    })

    dialogRef.afterClosed().subscribe(updatedList => {
      if (updatedList) {
        oldList.shopName = updatedList.shopName;
        oldList.participantsList = updatedList.participantsList;
      }
    });
  }

  createNewList() {
    const dialogRef = this.dialog.open(AddListModalComponent, {
      width: '580px',
      data: {
        dialogTitle: "Stwórz nową listę zakupów"
      }
    })

    dialogRef.afterClosed().subscribe(newList => {
      if (newList) {
        this.lists.push(newList);
        if (this.lists.length == 1) $('#noListsAvailableOption')[0].classList.add("hidden");
        $(function () {
          $('#listId').val(newList.id);
          $('#load-list-btn').trigger('click');
        });
        if (newList.buyer.userName == this.tokenStorageService.getUser().username) {
          $('#deleteListBtn')[0].classList.remove("hidden");
          $('#edit-list-btn')[0].classList.remove("hidden");
        }
      }
    });
  }

  deleteList() {
    var selectedList;
    this.lists.forEach(l => {
      if (l.id == $('#listId').children("option:selected").val()) selectedList = l;
    })

    const dialogData = new ConfirmDialogModel("Usuń listę o id: " + selectedList.id, "Czy na pewno chcesz usunąć listę?");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.shoppingListService.deleteShoppingList(selectedList.id).subscribe(() => {
        this.lists.splice(this.lists.indexOf(selectedList), 1);
        if (this.lists.length == 0) {
          $('#listId').val(0);
          $('#noListsAvailableOption')[0].classList.remove("hidden");
        }
      });
    });
  }

  checkDeleteBtnAvailability() {
    this.lists.forEach(list => {
      if (list.id == $('#listId').children("option:selected").val()) {
        if (list.buyer.userName == this.tokenStorageService.getUser().username) {
          $('#deleteListBtn')[0].classList.remove("hidden");
          $('#edit-list-btn')[0].classList.remove("hidden");
        }
        else {
          $('#deleteListBtn')[0].classList.add("hidden");
          $('#edit-list-btn')[0].classList.add("hidden");
        }
      }
    });
  }

  gazetkaRedirection() {
    var selectedList: ShoppingListDTO;
    this.lists.forEach(l => {
      if (l.id == $('#listId').children("option:selected").val()) selectedList = l;
    })
    window.open(selectedList.shopPromotionUrl);
  }
}


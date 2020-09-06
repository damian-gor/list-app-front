import { Component, OnInit, EventEmitter } from '@angular/core';
import { ShoppingListDTO } from '../../models/shopping-list-dto'
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddListModalComponent } from '../modals/add-list-modal/add-list-modal.component'
import { ConfirmDialogComponent, ConfirmDialogModel } from '../modals/confirm-dialog/confirm-dialog.component'

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
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllShoppingLists();
  }


  getAllShoppingLists() {
    this.shoppingListService.getAllShoppingLists().subscribe(result => {
      if (result.length > 0) {
        this.lists = result;
      }
    });
  }

  loadList() {
    this.selectedListId = $('#listId').children("option:selected").val();
    this.uploadSuccess.emit(this.selectedListId);
    $('#shopping-list-container').removeAttr("hidden");
  }

  editList() {
    var oldList;
    this.lists.forEach(l => {
      if (l.id == $('#listId').children("option:selected").val()) oldList = l;
    })

    var listTemplate = new ShoppingListDTO();
    listTemplate.shopName = oldList.shopName;
    listTemplate.id = oldList.id;

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
        $('#listId').val(newList);
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
      if (result) this.shoppingListService.deleteShoppingList(selectedList.id).subscribe( data =>
        {
          this.lists.splice(this.lists.indexOf(selectedList), 1);
        });
    });
  }

}

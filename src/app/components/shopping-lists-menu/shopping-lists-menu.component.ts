import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingList } from '../../models/shopping-list'
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-shopping-lists-menu',
  templateUrl: './shopping-lists-menu.component.html',
  styleUrls: ['./shopping-lists-menu.component.scss']
})
export class ShoppingListsMenuComponent implements OnInit {

  uploadSuccess: EventEmitter<String> = new EventEmitter();

  selectedShoppingList: ShoppingList;
  selectedListId: any;
  lists: ShoppingList[] = new Array<ShoppingList>();

  constructor(private shoppingListService: ShoppingListService) {
  }
  
  ngOnInit(): void {
    this.getAllShoppingLists();
  }

  
  getAllShoppingLists() {
    this.shoppingListService.getAllShoppingLists().subscribe(result => 
      {
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

}

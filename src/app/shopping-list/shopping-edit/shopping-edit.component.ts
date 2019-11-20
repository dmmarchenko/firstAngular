import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput')
  itemName: ElementRef;
  @ViewChild('amountInput')
  itemAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {
  }

  onItemAdded() {
    this.shoppingListService.addItem(this.itemName.nativeElement.value, this.itemAmount.nativeElement.value);
  }
}

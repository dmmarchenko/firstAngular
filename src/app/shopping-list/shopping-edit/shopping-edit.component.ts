import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

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
  @Output()
  itemAdded = new EventEmitter<Ingredient>();

  onItemAdded() {
    this.itemAdded.emit(new Ingredient(this.itemName.nativeElement.value, this.itemAmount.nativeElement.value));
  }
}

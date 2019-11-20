import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  itemsChanged = new EventEmitter<Ingredient[]>();
  private items: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getItems() {
    return this.items.slice();
  }

  addItem(itemName: string, itemAmount: number) {
    this.items.push(new Ingredient(itemName, itemAmount));
    this.itemsChanged.emit(this.items.slice());
  }

  addItems(ingredients: Ingredient[]) {
    this.items.push(...ingredients);
    this.itemsChanged.emit(this.items.slice());
  }
}

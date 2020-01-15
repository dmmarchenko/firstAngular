import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  itemsChanged = new Subject<Ingredient[]>();
  private items: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getItems() {
    return this.items.slice();
  }

  addItem(itemName: string, itemAmount: number) {
    this.items.push(new Ingredient(itemName, itemAmount));
    this.itemsChanged.next(this.items.slice());
  }

  addItems(ingredients: Ingredient[]) {
    this.items.push(...ingredients);
    this.itemsChanged.next(this.items.slice());
  }
}

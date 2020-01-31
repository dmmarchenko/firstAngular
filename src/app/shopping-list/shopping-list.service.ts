import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  itemsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private items: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 7),
    new Ingredient('Bread', 2),
    new Ingredient('Beer', 1),
    new Ingredient('Meet', 10),
  ];

  getItems() {
    return this.items.slice();
  }

  getItem(index: number) {
    return this.items[index];
  }

  addItem(item: Ingredient) {
    this.items.push(item);
    this.itemsChanged.next(this.items.slice());
  }

  addItems(ingredients: Ingredient[]) {
    this.items.push(...ingredients);
    this.itemsChanged.next(this.items.slice());
  }

  updateItem(index: number, newItem: Ingredient) {
    this.items[index] = newItem;
    this.itemsChanged.next(this.items.slice());
  }

  removeItem(editedItemIndex: number) {
    this.items = this.items.splice(editedItemIndex, 1);
    this.itemsChanged.next(this.items.slice());
  }
}

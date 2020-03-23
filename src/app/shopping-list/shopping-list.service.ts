import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  startedEditing = new Subject<number>();

  private items: Ingredient[] = [];

  getItem(index: number) {
    return this.items[index];
  }
}

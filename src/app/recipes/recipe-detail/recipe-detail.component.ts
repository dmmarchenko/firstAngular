import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  @Input()
  recipe: Recipe;

  constructor(private slService: ShoppingListService) {
  }

  onToShoppingList(ingredients: Ingredient[]) {
    this.slService.addItems(ingredients);
  }
}

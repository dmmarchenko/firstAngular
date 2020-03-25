import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RecipeService {

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }
}

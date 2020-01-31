import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Garlic Butter Sauteed Zucchini', 'Sautéed zucchini is a quick, easy, and healthy side dish.',
      'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-2-1200.jpg',
      [new Ingredient('Garlic', 1), new Ingredient('Bread', 2), new Ingredient('Butter', 2)]),
    new Recipe( 'Pizza casserole', 'This Easy Pizza Casserole recipe is a family-favorite meal that is kid tested and husband approved!',
      'https://cantstayoutofthekitchen.com/wp-content/uploads/Pizza-Casserole-4f7e6.jpg',
      [new Ingredient('Cheese', 4), new Ingredient('Saliami', 4), new Ingredient('Bread', 6)]),
    new Recipe( 'Pasta pomodoro', 'This Italian pasta pomodoro recipe is made with fresh tomatoes and a light and flavorful sauce.',
      'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg',
      [new Ingredient('Cheese', 4), new Ingredient('Tomatoes', 2), new Ingredient('Bread', 6)])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
   this.recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }
}

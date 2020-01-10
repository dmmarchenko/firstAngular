import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private slService: ShoppingListService,
              private route: ActivatedRoute) {
  }

  onToShoppingList(ingredients: Ingredient[]) {
    this.slService.addItems(ingredients);
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.recipe = data.recipe;
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {
  }

  public storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient
      .put('https://learn-angular-838de.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  public fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>('https://learn-angular-838de.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}

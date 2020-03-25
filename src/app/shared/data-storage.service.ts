import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { SetRecipes } from '../recipes/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private store: Store<AppState>) {
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
          this.store.dispatch(new SetRecipes(recipes));
        })
      );
  }
}

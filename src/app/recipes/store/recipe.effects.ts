import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FETCH_RECIPES, SetRecipes } from './recipe.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(FETCH_RECIPES),
    switchMap(() => this.httpClient.get<Recipe[]>('https://learn-angular-838de.firebaseio.com/recipes.json')),
    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    map(recipes => {
      return new SetRecipes(recipes);
    })
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {
  }
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FETCH_RECIPES, SetRecipes, STORE_RECIPES } from './recipe.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';

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

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([, recipeState]) => {
      return this.httpClient
        .put('https://learn-angular-838de.firebaseio.com/recipes.json', recipeState.recipes);
    })
  );

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<AppState>) {
  }
}

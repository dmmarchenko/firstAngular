import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Observable, of } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { FetchRecipes, SET_RECIPES } from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<AppState>, private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] {
    return this.store.select('recipe').pipe(
      take(1),
      map(recipeState => recipeState.recipes),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new FetchRecipes());
          return this.actions$.pipe(
            ofType(SET_RECIPES),
            take(1)
          );
        }
        return of(recipes);
      })
    );
  }

}

import { Recipe } from './recipe.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    const recipeId = +route.params.id;
    return this.store.select('recipe').pipe(
      take(1),
      map(recipeState => recipeState.recipes),
      map(recipes => recipes.find((recipe, index) => index === recipeId))
    );
  }

}

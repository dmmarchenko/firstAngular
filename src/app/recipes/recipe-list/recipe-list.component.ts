import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  private recipesChangedSub: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('recipe')
      .pipe(map(recipeState => recipeState.recipes))
      .subscribe((newRecipes: Recipe[]) => {
        this.recipes = newRecipes;
      });
  }

  ngOnDestroy(): void {
    if (this.recipesChangedSub) {
      this.recipesChangedSub.unsubscribe();
    }
  }
}

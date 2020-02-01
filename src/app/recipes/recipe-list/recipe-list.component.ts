import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

    recipes: Recipe[];
    private recipesChangedSub: Subscription;

    constructor(private recipeService: RecipeService) {
    }

    ngOnInit(): void {
        this.recipes = this.recipeService.getRecipes();
        this.recipesChangedSub = this.recipeService.recipesChanged.subscribe((newRecipes: Recipe[]) => {
            this.recipes = newRecipes;
        });
    }

    ngOnDestroy(): void {
        this.recipesChangedSub.unsubscribe();
    }
}

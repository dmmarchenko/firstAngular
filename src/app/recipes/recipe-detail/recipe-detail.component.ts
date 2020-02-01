import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    id: number;
    recipe: Recipe;

    constructor(private slService: ShoppingListService,
                private route: ActivatedRoute,
                private recipeService: RecipeService,
                private router: Router) {
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
        this.route.params.subscribe((params: Params) => {
            this.id = +params.id;
        });
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['/recipes']);
    }
}

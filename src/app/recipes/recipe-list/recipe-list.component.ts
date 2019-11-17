import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[] = [new Recipe('Garlic Butter Sauteed Zucchini', 'Sautéed zucchini is a quick, easy, and healthy side dish.',
        'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-2-1200.jpg'),
        new Recipe('Pizza casserole', 'This Easy Pizza Casserole recipe is a family-favorite meal that is kid tested and husband approved!',
            'https://cantstayoutofthekitchen.com/wp-content/uploads/Pizza-Casserole-4f7e6.jpg'),
        new Recipe('Pasta pomodoro', 'This Italian pasta pomodoro recipe is made with fresh tomatoes and a light and flavorful sauce.',
            'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg')
    ];
    @Output()
    recipeSelected = new EventEmitter<Recipe>();

    onRecipeSelected($event: Recipe) {
        this.recipeSelected.emit($event);
    }

    ngOnInit(): void {
        this.recipeSelected.emit(this.recipes[0]);
    }
}

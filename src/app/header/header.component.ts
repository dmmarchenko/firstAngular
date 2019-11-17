import {Component, EventEmitter, Output} from '@angular/core';
import {Routes} from '../shared/routes.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Output()
    pageChanged = new EventEmitter<string>();

    goToRecipes() {
        this.pageChanged.emit(Routes.RECIPES);
    }

    goToShoppingList() {
        this.pageChanged.emit(Routes.SHOPPING_LIST);
    }
}


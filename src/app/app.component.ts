import {Component} from '@angular/core';
import {Routes} from './shared/routes.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    activePage = Routes.RECIPES;

    onRecipesPage(): boolean {
        return this.activePage === Routes.RECIPES;
    }

    onShoppingListPage(): boolean {
        return this.activePage === Routes.SHOPPING_LIST;
    }

    onPageChanged($event: string) {
        this.activePage = $event;
    }
}

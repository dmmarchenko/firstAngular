import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
    }

    public storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.httpClient
            .put('https://learn-angular-838de.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    public fetchRecipes(): Observable<Recipe[]> {
        return this.authService.user
            .pipe(
                take(1),
                exhaustMap(user => {
                    return this.httpClient.get<Recipe[]>('https://learn-angular-838de.firebaseio.com/recipes.json',
                        {
                            params: new HttpParams().set('auth', user.token)
                        });
                }),
                map(recipes => {
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    });
                }),
                tap(recipes => {
                    console.log(recipes);
                    this.recipeService.setRecipes(recipes);
                })
            );
    }
}

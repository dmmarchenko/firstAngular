import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export class AddIngredientAction implements Action {
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;

  constructor(payload: Ingredient) {
    this.payload = payload;
  }
}

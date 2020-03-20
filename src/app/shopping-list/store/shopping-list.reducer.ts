import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 7),
    new Ingredient('Bread', 2),
    new Ingredient('Beer', 1),
    new Ingredient('Meet', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredientAction) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
  }
}

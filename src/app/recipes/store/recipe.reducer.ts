import { Recipe } from '../recipe.model';
import { ADD_RECIPE, DELETE_RECIPE, RecipeActions, SET_RECIPES, UPDATE_RECIPE } from './recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: []
};

export function recipeReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case SET_RECIPES:
      return {...state, recipes: [...action.payload]};
    case ADD_RECIPE:
      return {...state, recipes: [...state.recipes, action.payload]};
    case UPDATE_RECIPE:
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = action.payload.newRecipe;
      return {...state, recipes: updatedRecipes};
    case DELETE_RECIPE:
      return {...state, recipes: state.recipes.filter((recipe, idx) => idx != action.payload)};
    default:
      return state;
  }
}

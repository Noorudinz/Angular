import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUser from '../user/store/user.reducer';
import * as fromBuilding from '../building-master/store/building.reducer'
import { BuildingState } from '../building-master/store/building.state';
import { BUILDING_STATE_NAME } from '../building-master/store/building.selector';


// import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
// import * as fromRecipes from '../recipes/store/recipe.reducer';

export interface AppState {
  auth: fromAuth.State;
  user: fromUser.State;
  role: fromUser.State;
  [BUILDING_STATE_NAME]: BuildingState;
  // shoppingList: fromShoppingList.State;
  // recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducer,
  role: fromUser.roleReducer,
  [BUILDING_STATE_NAME]: fromBuilding.buildingsReducer
  // shoppingList: fromShoppingList.shoppingListReducer,
  // recipes: fromRecipes.recipeReducer
};

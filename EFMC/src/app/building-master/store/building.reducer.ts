import { createReducer, on } from "@ngrx/store";
import { UserRegister } from "src/app/user/user-account.model";
import { Building } from "../building.model";
import { loadBuildingSuccess } from "./building.actions";
import { initialState } from "./building.state";

export interface State {
  buildings: Building[];
  loading: boolean;
}


const _buildingsReducer = createReducer(initialState,
  on(loadBuildingSuccess, (state, action) => {
    return {
      ...state,
      buildings: action.buildings,
    };
  })

  );

export function buildingsReducer(state, action) {
  return _buildingsReducer(state, action);
}

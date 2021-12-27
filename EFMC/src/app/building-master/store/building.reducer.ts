import { createReducer, on } from "@ngrx/store";
import { UserRegister } from "src/app/user/user-account.model";
import { Building } from "../building.model";
import { addBuildingSuccess, loadBuildingSuccess } from "./building.actions";
import { initialState } from "./building.state";

export interface State {
  buildings: Building[];
  loading: boolean;
}


const _buildingsReducer = createReducer(initialState,
  on(addBuildingSuccess, (state, action) => {
    let building = { ...action.building };

    return {
      ...state,
      buildings: [...state.buildings, building],
    };
  }),

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

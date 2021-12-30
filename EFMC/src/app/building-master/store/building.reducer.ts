import { createReducer, on } from "@ngrx/store";
import { UserRegister } from "src/app/user/user-account.model";
import { Building } from "../building.model";
import { addBuildingSuccess, loadBuildingSuccess, updateBuildingSuccess } from "./building.actions";
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
  }),

  on(updateBuildingSuccess, (state, action) => {
    const updatedBuilding = state.buildings.map((building) => {
      return action.building.buildingId === building.buildingId ? action.building : building;
    });
    return {
      ...state,
      buildings: updatedBuilding,
    };
  }),

  );

export function buildingsReducer(state, action) {
  return _buildingsReducer(state, action);
}

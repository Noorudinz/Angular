import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BuildingState } from "./building.state";
export const BUILDING_STATE_NAME = 'buildings';



const getBuildingsState = createFeatureSelector<BuildingState>(BUILDING_STATE_NAME);

export const getBuildings = createSelector(getBuildingsState, (state) => {
  return state.buildings;
});

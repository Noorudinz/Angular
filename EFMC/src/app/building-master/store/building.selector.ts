import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Building } from "../building.model";
import { BuildingState } from "./building.state";
export const BUILDING_STATE_NAME = 'buildings';


const getBuildingsState = createFeatureSelector<BuildingState>(BUILDING_STATE_NAME);

export const getBuildings = createSelector(getBuildingsState, (state) => {
  return state.buildings;
});

// export const selectBuildings = (state: AppState) => state.buildings;

// export const getBuildingsById = (id: number) => createSelector(
//   selectBuildings,
//   (building: Building[]) => {
//   return building.find(item => item.buildingId === id);
// });






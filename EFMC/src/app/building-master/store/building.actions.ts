import { createAction, props } from "@ngrx/store";
import { Building } from "../building.model";


export const LOAD_BUILDINGS = '[building page] load building';
export const LOAD_BUILDINGS_SUCCESS = '[building page] load building success';

export const loadBuilding = createAction(LOAD_BUILDINGS);
export const loadBuildingSuccess = createAction(LOAD_BUILDINGS_SUCCESS, props<{ buildings: Building[] }>());

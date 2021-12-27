import { createAction, props } from "@ngrx/store";
import { Building } from "../building.model";


export const LOAD_BUILDINGS = '[building page] load building';
export const LOAD_BUILDINGS_SUCCESS = '[building page] load building success';
export const ADD_BUILDINGS = '[building page] add building';
export const ADD_BUILDINGS_SUCCESS = '[building page] add building success';

export const loadBuilding = createAction(LOAD_BUILDINGS);
export const loadBuildingSuccess = createAction(LOAD_BUILDINGS_SUCCESS, props<{ buildings: Building[] }>());
export const addBuilding = createAction(ADD_BUILDINGS, props<{ addorUpdate: Building }>());
export const addBuildingSuccess = createAction(ADD_BUILDINGS_SUCCESS, props<{ building: Building }>());

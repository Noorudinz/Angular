
import { FlatList, FlatOwners } from './../flat-owners.model';
import { createAction, props } from '@ngrx/store';

export const ADD_FLATS = '[flats page] add flats';
export const ADD_FLATS_SUCCESS = '[flats page] add flats success';
export const UPDATE_FLAT_ACTION = '[flats page] update flats';
export const UPDATE_FLAT_SUCCESS = '[flats page] update flats success';

export const LOAD_FLATS = '[flats page] load flats';
export const LOAD_FLATS_SUCCESS = '[flats page] load flats success';

export const addFlat = createAction(ADD_FLATS, props<{ addFlatOwner: FlatList }>());
export const addFlatSuccess = createAction(ADD_FLATS_SUCCESS, props<{ flat: FlatList }>());
export const updateFlat = createAction(UPDATE_FLAT_ACTION, props<{ flatsData: FlatOwners }>());
export const updateFlatSuccess = createAction(UPDATE_FLAT_SUCCESS, props<{ flatsData: FlatOwners }>());

export const loadFlats = createAction(LOAD_FLATS);
export const loadFlatsSuccess = createAction(LOAD_FLATS_SUCCESS, props<{ flats: FlatList[] }>());

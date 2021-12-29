
import { PriceFactorData } from './../price-factor.model';
import { createAction, props } from '@ngrx/store';


export const UPDATE_FACTOR_ACTION = '[posts page] update post';
export const UPDATE_FACTOR_SUCCESS = '[posts page] update post success';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const DELETE_POST_SUCCESS = '[posts page] delete post success';

export const LOAD_FACTOR = '[factor page] load factor';
export const LOAD_FACTOR_SUCCESS = '[factor page] load factor success';

// export const addPost = createAction(ADD_POST_ACTION, props<{ post: FlatList }>());
// export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: FlatList }>());
// export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: FlatList }>());
// export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<{ post: FlatList }>());
// export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>());
// export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ id: string }>());

export const loadFactor = createAction(LOAD_FACTOR);
export const loadFactorSuccess = createAction(LOAD_FACTOR_SUCCESS, props<{ factors: PriceFactorData[] }>());
export const updateFactor = createAction(UPDATE_FACTOR_ACTION, props<{ factor: PriceFactorData }>());
export const updateFactorSuccess = createAction(UPDATE_FACTOR_SUCCESS, props<{ factor: PriceFactorData }>());

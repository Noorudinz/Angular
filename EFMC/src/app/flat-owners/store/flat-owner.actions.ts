
import { FlatList } from './../flat-owners.model';
import { createAction, props } from '@ngrx/store';

export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post success';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const UPDATE_POST_SUCCESS = '[posts page] update post success';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const DELETE_POST_SUCCESS = '[posts page] delete post success';

export const LOAD_FLATS = '[flats page] load flats';
export const LOAD_FLATS_SUCCESS = '[flats page] load flats success';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: FlatList }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: FlatList }>());
export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: FlatList }>());
export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<{ post: FlatList }>());
export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ id: string }>());

export const loadFlats = createAction(LOAD_FLATS);
export const loadFlatsSuccess = createAction(LOAD_FLATS_SUCCESS, props<{ flats: FlatList[] }>());

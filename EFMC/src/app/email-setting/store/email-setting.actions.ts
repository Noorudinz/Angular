import { createAction, props } from '@ngrx/store';
import { EmailData } from '../email.model';

// export const ADD_POST_ACTION = '[posts page] add post';
// export const ADD_POST_SUCCESS = '[posts page] add post success';
// export const UPDATE_POST_ACTION = '[posts page] update post';
// export const UPDATE_POST_SUCCESS = '[posts page] update post success';
// export const DELETE_POST_ACTION = '[posts page] delete post';
// export const DELETE_POST_SUCCESS = '[posts page] delete post success';

export const LOAD_EMAIL = '[email page] load email';
export const LOAD_EMAIL_SUCCESS = '[email page] load email success';

// export const addPost = createAction(ADD_POST_ACTION, props<{ post: FlatList }>());
// export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: FlatList }>());
// export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: FlatList }>());
// export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<{ post: FlatList }>());
// export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>());
// export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ id: string }>());

export const loadEmail = createAction(LOAD_EMAIL);
export const loadEmailSuccess = createAction(LOAD_EMAIL_SUCCESS, props<{ emails: EmailData[] }>());

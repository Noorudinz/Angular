import { createReducer, on } from '@ngrx/store';
import { initialState } from './email-setting.state';
import { loadEmailSuccess } from './email-setting.actions';

const _emailsReducer = createReducer(initialState,
  // on(addPostSuccess, (state, action) => {
  //   let post = { ...action.post };

  //   return {
  //     ...state,
  //     posts: [...state.posts, post],
  //   };
  // }),

  // on(updatePost, (state, action) => {
  //   const updatedPosts = state.posts.map((post) => {
  //     return action.post.id === post.id ? action.post : post;
  //   });

  //   return {
  //     ...state,
  //     posts: updatedPosts,
  //   };
  // }),

  // on(updatePostSuccess, (state, action) => {
  //   const updatedPosts = state.posts.map((post) => {
  //     return action.post.id === post.id ? action.post : post;
  //   });
  //   return {
  //     ...state,
  //     posts: updatedPosts,
  //   };
  // }),

  // on(deletePost, (state, { id }) => {
  //   const updatedPosts = state.posts.filter((post) => {
  //     return post.id !== id;
  //   });

  //   return {
  //     ...state,
  //     posts: updatedPosts,
  //   };
  // }),

  // on(deletePostSuccess, (state, { id }) => {
  //   const updatedPosts = state.posts.filter((post) => {
  //     return post.id !== id;
  //   });
  //   return {
  //     ...state,
  //     posts: updatedPosts,
  //   };
  // }),

  on(loadEmailSuccess, (state, action) => {
      return {
        ...state,
        emails: action.emails,
      };
    })
  );

export function emailsReducer(state, action) {
  return _emailsReducer(state, action);
}

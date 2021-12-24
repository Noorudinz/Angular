import { createReducer, on } from '@ngrx/store';
import { initialState } from './flat-owner.state';
import { loadFlatsSuccess } from './flat-owner.actions';

const _flatsReducer = createReducer(initialState,
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

  on(loadFlatsSuccess, (state, action) => {
      return {
        ...state,
        flats: action.flats,
      };
    })
  );

export function flatsReducer(state, action) {
  return _flatsReducer(state, action);
}

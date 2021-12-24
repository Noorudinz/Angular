import { createReducer, on } from '@ngrx/store';
import { initialState } from './price-factor.state';
import { loadFactorSuccess } from './price-factor.actions';

const _factorsReducer = createReducer(initialState,
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

  on(loadFactorSuccess, (state, action) => {
      return {
        ...state,
        factors: action.factors,
      };
    })
  );

export function factorsReducer(state, action) {
  return _factorsReducer(state, action);
}

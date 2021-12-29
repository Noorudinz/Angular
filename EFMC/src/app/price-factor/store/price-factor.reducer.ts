import { createReducer, on } from '@ngrx/store';
import { initialState } from './price-factor.state';
import { loadFactorSuccess, updateFactorSuccess } from './price-factor.actions';

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

  on(updateFactorSuccess, (state, action) => {
    let dataArr = Array.from(state.factors);
    const updatedFactor = dataArr.map((factor) => {
      return action.factor.priceID === factor.priceID ? action.factor : factor;
    });
    return {
      ...state,
      factors: updatedFactor,
    };
  }),

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

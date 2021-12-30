import { createReducer, on } from '@ngrx/store';
import { initialState } from './flat-owner.state';
import { addFlatSuccess, loadFlatsSuccess, updateFlat, updateFlatSuccess } from './flat-owner.actions';

const _flatsReducer = createReducer(initialState,

  on(addFlatSuccess, (state, action) => {
    let flat = { ...action.flat };
    return {
      ...state,
      flats: [...state.flats, flat],
    };
  }),

  on(updateFlatSuccess, (state, action) => {
    const updatedFlat = state.flatsData.map((flatsData) => {
      return action.flatsData.flatNo === flatsData.flatNo ? action.flatsData : flatsData;
    });

    return {
      ...state,
      flatsData: updatedFlat,
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

import { createReducer, on } from '@ngrx/store';
import { initialState } from './email-setting.state';
import { loadEmailSuccess, updateEmail, updateEmailSuccess } from './email-setting.actions';

const _emailsReducer = createReducer(initialState,
  // on(addPostSuccess, (state, action) => {
  //   let post = { ...action.post };

  //   return {
  //     ...state,
  //     posts: [...state.posts, post],
  //   };
  // }),

  // on(updateEmail, (state, action) => {
  //   const updatedEmail = state.emails.map((email) => {
  //     return action.email.id === email.id ? action.email : email;
  //   });

  //   return {
  //     ...state,
  //     emails: updatedEmail,
  //   };
  // }),

  on(updateEmailSuccess, (state, action) => {
    let dataArr = Array.from(state.emails); //map error convert to data array
    const updatedEmail = dataArr.map((email) => {
      console.log(state.emails);
      return action.email.id === email.id ? action.email : email;
    });

    return {
      ...state,
      emails: updatedEmail,
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

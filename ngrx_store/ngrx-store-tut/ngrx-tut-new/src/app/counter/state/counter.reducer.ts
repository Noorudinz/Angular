import { createReducer, on } from "@ngrx/store";
import { initialState } from "./counter.state";
import { decrement, increment, reset, customIncrement, changeChannelName } from "./counter.actions";

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrement, (state, action) => {
    console.log(action);
    return {
      ...state,
      counter: state.counter + action.count,
    };
  }),
  on(changeChannelName, (state) => {
    return {
      ...state,
      channelName: 'Modified Noor Web Dev',
    };
  })
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}


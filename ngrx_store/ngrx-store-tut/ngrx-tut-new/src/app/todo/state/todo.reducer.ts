import { createReducer, on } from "@ngrx/store";
import { addTodo, deleteTodo, updateTodo } from "./todo.actions";
import { initialState } from "./todo.state";



const _todoReducer = createReducer(initialState,
  on(addTodo, (state, action) => {
    let todo = { ...action.todo };

    todo.id = (state.todoList.length + 1).toString();

    return {
      ...state,
      todoList: [...state.todoList, todo],
    };
  }),
  on(updateTodo, (state, action) => {
    const updatedTodo = state.todoList.map((todo) => {
      return action.todo.id === todo.id ? action.todo : todo;
    });

    return {
      ...state,
      todoList: updatedTodo,
    };
  }),
  on(deleteTodo, (state, { id }) => {
    const updatedTodo = state.todoList.filter((todo) => {
      return todo.id !== id;
    });

    return {
      ...state,
      todoList: updatedTodo,
    };
  })
  );

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}

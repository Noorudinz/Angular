
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todo.state';

const getTodoListState = createFeatureSelector<TodosState>('todoList');

export const getTodoList = createSelector(getTodoListState, (state) => {
  return state.todoList;
});

export const getTodoListById = createSelector(getTodoListState, (state, props) => {
  return state.todoList.find((todo) => todo.id === props.id);
});

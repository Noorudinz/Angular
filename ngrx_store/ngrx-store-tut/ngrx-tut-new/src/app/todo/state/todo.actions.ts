import { createAction, props } from '@ngrx/store';
import { ToDo } from 'src/app/models/todos.model';

export const ADD_TODO_ACTION = '[todo page] add todo';
export const UPDATE_TODO_ACTION = '[todo page] update todo';
export const DELETE_TODO_ACTION = '[todo page] delete todo';

export const addTodo = createAction(ADD_TODO_ACTION, props<{ todo: ToDo }>());
export const updateTodo = createAction(UPDATE_TODO_ACTION, props<{ todo: ToDo }>());
export const deleteTodo = createAction(DELETE_TODO_ACTION, props<{ id: string }>());

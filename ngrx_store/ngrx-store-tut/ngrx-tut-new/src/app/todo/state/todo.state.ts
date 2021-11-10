import { ToDo } from "src/app/models/todos.model";

export interface TodosState {
  todoList: ToDo[];
}

export const initialState: TodosState = {
  todoList: [
    { id: '1', name: 'todo list 1' },
    { id: '2', name: 'todo list 2' }
  ],
};

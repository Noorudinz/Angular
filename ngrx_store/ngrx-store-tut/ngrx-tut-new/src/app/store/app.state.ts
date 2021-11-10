import { CounterState } from './../counter/state/counter.state';
import { PostsState } from './../posts/state/posts.state';
import { TodosState } from '../todo/state/todo.state';

import { counterReducer } from '../counter/state/counter.reducer';
import { postsReducer } from '../posts/state/posts.reducer';
import { todoReducer } from '../todo/state/todo.reducer';


export interface AppState {
  counter: CounterState;
  posts: PostsState;
  todoList: TodosState;
}

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer,
  todoList: todoReducer
};



import { ToDo } from 'src/app/models/todos.model';


import { Post } from './../../models/posts.model';

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [
    { id: '1', title: 'Sample Title 1', description: 'Sample Description 1' },
    { id: '2', title: 'Sample Title 2', description: 'Sample Description 2' },
    { id: '3', title: 'Sample Title 3', description: 'Sample Description 3' },
  ],
};

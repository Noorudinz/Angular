import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todos.model';
import { AppState } from '../store/app.state';
import { addTodo, deleteTodo } from './state/todo.actions';
import { getTodoList } from './state/todo.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoList: Observable<ToDo[]>;
  todoForm: FormGroup;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.todoList = this.store.select(getTodoList);
    this.todoForm = new FormGroup({
      newTodo : new FormControl(null, [
        Validators.required
      ])
    });
  }

  onAddTodo() {
    if (!this.todoForm.valid) {
      return;
    }

    const todo: ToDo = {
      name: this.todoForm.value.newTodo
    };
   this.store.dispatch(addTodo({ todo }));
   this.todoForm.reset();
  }

  onDeleteTodo(id: string) {
    this.store.dispatch(deleteTodo({ id }));
  }

  // newTodo: string;
  //   todos: any;
  //   todoObj: any;

  //   constructor() {
  //     this.newTodo = '';
  //     this.todos = [];
  //   }

  //   addTodo(event) {
  //     this.todoObj = {
  //       newTodo: this.newTodo,
  //       completed: false
  //     }
  //     this.todos.push(this.todoObj);
  //     this.newTodo = '';
  //     event.preventDefault();
  //   }

  //   deleteTodo(index) {
  //     this.todos.splice(index, 1);
  //   }

  //   deleteSelectedTodos() {
  //     //need ES5 to reverse loop in order to splice by index
  //     for(var i=(this.todos.length -1); i > -1; i--) {
  //       if(this.todos[i].completed) {
  //         this.todos.splice(i, 1);
  //       }
  //     }
  //   }
}

import { NgFor } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodoItemComponent } from './UI/todo-item/todo-item.component';
import { TodoStore } from './data-access/todo-store';
import { TodosService } from './data-access/todos.service';
import { TodoItem } from './model/todo-item.model';

@Component({
  standalone: true,
  imports: [NgFor, TodoItemComponent],
  providers: [TodosService, TodoStore],
  selector: 'app-root',
  template: `
    <div class="container-fluid">
      <h1>TODO APP</h1>
      @for (item of todos(); track item.id) {
        <app-todo-item
          [todo]="item"
          (onDelete)="delete(item.id)"
          (onUpdate)="update(item)" />
      }
    </div>
  `,
  styles: `
    :host {
      display: grid;
      place-items: center;
    }
    h1 {
      text-align: center;
    }
  `,
})
export class AppComponent implements OnInit {
  todos: WritableSignal<TodoItem[]> = this.store.todos;

  constructor(
    private store: TodoStore,
    private service: TodosService,
  ) {}

  ngOnInit(): void {
    this.service.getAll();
  }

  update(todo: TodoItem) {
    this.service.update({
      id: todo.id,
      title: randText(),
      userId: todo.userId,
    });
  }

  delete(id: number) {
    this.service.delete(id);
  }
}

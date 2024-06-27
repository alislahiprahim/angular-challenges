import { Injectable, WritableSignal, signal } from '@angular/core';
import { TodoItem } from '../model/todo-item.model';

@Injectable()
export class TodoStore {
  todos: WritableSignal<TodoItem[]> = signal<TodoItem[]>([]);

  addAll(todos: TodoItem[]) {
    this.todos.set(todos);
  }

  update(updatedTodo: Partial<TodoItem>) {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
      ),
    );
  }

  delete(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }
}

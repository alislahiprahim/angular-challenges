import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { throwError } from 'rxjs';
import { TodoItem } from '../model/todo-item.model';
import { TodoStore } from './todo-store';

@Injectable()
export class TodosService {
  private http = inject(HttpClient);
  private store = inject(TodoStore);
  private readonly BASE_URL: string =
    'https://jsonplaceholder.typicode.com/todos';

  getAll() {
    this.http.get<TodoItem[]>(this.BASE_URL).subscribe({
      next: (todos: TodoItem[]) => this.store.addAll(todos),
      error: (error: Error) => throwError(error),
      complete:()=>console.log('done')
    });
  }

  update(todo: TodoItem) {
    this.http.put<TodoItem>(`${this.BASE_URL}/${todo.id}`, todo).subscribe({
      next: (todo: TodoItem) => this.store.update(todo),
      error: (error: Error) => throwError(error),
      complete:()=>console.log('done')
    });
  }

  delete(id: number) {
    this.http.delete<void>(`${this.BASE_URL}/${id}`).subscribe({
      next: () => this.store.delete(id),
      error: (error: Error) => throwError(error),
    });
  }
}

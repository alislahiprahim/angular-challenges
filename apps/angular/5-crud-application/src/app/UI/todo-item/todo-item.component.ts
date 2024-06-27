import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TodoItem } from '../../model/todo-item.model';
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card appearance="raised">
      <mat-card-content>{{ todo().title }}</mat-card-content>
      <mat-card-actions align="end">
        <button mat-button (click)="onUpdate.emit()">
          <mat-icon
            aria-hidden="false"
            aria-label="home icon"
            fontIcon="edit"></mat-icon>
        </button>
        <button mat-button (click)="onDelete.emit()">
          <mat-icon
            aria-hidden="false"
            aria-label="delete icon"
            fontIcon="delete"></mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    mat-card {
      max-width: 400px;
      margin-block: 7px;
    }
    mat-icon[fontIcon='delete'] {
      color: #c71a1a;
    }
  `,
})
export class TodoItemComponent {
  todo = input.required<TodoItem>();
  onUpdate = output();
  onDelete = output();
}

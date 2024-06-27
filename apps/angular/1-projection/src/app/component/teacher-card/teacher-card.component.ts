import { NgFor } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemRefDirective } from '../../ui/list-item/listItemRef.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (onAddingItem)="addTeacher()">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template listItemRef let-teacher>
        <app-list-item (onItemDeleted)="delete(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, NgFor, ListItemRefDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers: WritableSignal<Teacher[]> = this.store.teachers;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}

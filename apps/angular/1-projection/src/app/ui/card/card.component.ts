import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  TemplateRef,
  input,
  output,
} from '@angular/core';
import { ListItemRefDirective } from '../list-item/listItemRef.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>
    <section>
      @for (item of list(); track item.id) {
        <ng-template
          [ngTemplateOutlet]="listItemTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T extends { id: number }> {
  list = input<T[]>([]);
  itemAdded = output<boolean>({
    alias: 'onAddingItem',
  });

  @ContentChild(ListItemRefDirective, { read: TemplateRef })
  listItemTemplate!: TemplateRef<{ $implicit: T }>;

  addNewItem() {
    this.itemAdded.emit(true);
  }
}

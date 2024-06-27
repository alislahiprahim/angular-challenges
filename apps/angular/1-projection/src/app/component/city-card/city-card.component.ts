import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemRefDirective } from '../../ui/list-item/listItemRef.directive';
@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (onAddingItem)="add()">
      <img src="assets/img/city.png" width="200px" />
      <ng-template listItemRef let-city>
        <app-list-item (onItemDeleted)="delete(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, NgFor, ListItemRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  cities: WritableSignal<City[]> = this.store.cities;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  add() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}

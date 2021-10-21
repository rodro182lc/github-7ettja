import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IgxGridCellComponent } from '@infragistics/igniteui-angular/lib/grids/cell.component';
import { Trip } from '@shared/models/trips/trip.model';
import { TripGridColumn } from 'app/trips/enumerations/trip-grid-column.enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-event-column',
  templateUrl: './event-column.component.html',
  styleUrls: ['./event-column.component.scss']
})
export class EventColumnComponent implements OnInit {
  @Input() cell!: IgxGridCellComponent;
  @Input() trip!: Trip;
  @Input() eventType!: TripGridColumn.LastEvent | TripGridColumn.NextEvent;

  column = TripGridColumn;

  ngOnInit(): void {
    if (!this.cell || !this.trip || !this.eventType) {
      throw new Error('Cell, trip and event type inputs must be set');
    }
  }
}

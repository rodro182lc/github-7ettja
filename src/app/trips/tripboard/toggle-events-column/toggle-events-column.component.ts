import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Trip } from '@shared/models/trips/trip.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toggle-events-column',
  templateUrl: './toggle-events-column.component.html',
  styleUrls: ['./toggle-events-column.component.scss']
})
export class ToggleEventsColumnComponent implements OnInit {
  @Input() icon!: string;
  @Input() trip!: Trip;

  ngOnInit(): void {
    if (!this.icon || !this.trip) {
      throw new Error('Both icon and trip must be set as inputs');
    }
  }
}

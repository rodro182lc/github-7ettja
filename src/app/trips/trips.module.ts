import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TripsRoutingModule } from './trips-routing.module';
import { TripEventsComponent } from './trip-events/tripevents.component';
import { TripboardComponent } from './tripboard/tripboard.component';
import { EventColumnComponent } from './tripboard/event-column/event-column.component';
import { ToggleEventsColumnComponent } from './tripboard/toggle-events-column/toggle-events-column.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripboardContainerComponent } from './tripboard-container/tripboard-container.component';

@NgModule({
  declarations: [
    TripboardContainerComponent,
    TripboardComponent,
    TripEventsComponent,
    EventColumnComponent,
    ToggleEventsColumnComponent,
    TripDetailComponent
  ],
  imports: [TripsRoutingModule, SharedModule],
  providers: []
})
export class TripsModule {}

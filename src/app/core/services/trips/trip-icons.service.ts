import { Injectable } from '@angular/core';
import { DateTimeHelper } from '@shared/helpers/date-time.helper';
import { TripEventColumnIcon } from '@shared/models/trips/trip-event-column-icon.model';
import { TripIcon } from '@shared/models/trips/trip-icon.model';
import { Trip } from '@shared/models/trips/trip.model';
import { ACXStatuses } from 'app/trips/enumerations/acx-statuses.enum';
import { Events } from 'app/trips/enumerations/events.enum';
import { ProbillEventStatuses } from 'app/trips/enumerations/probill-event-statuses.enum';
import { ReeferStatuses } from 'app/trips/enumerations/reefer-statuses.enum';
import { TripAuxiliaryItems } from 'app/trips/enumerations/trip-auxiliary-items.enum';
import { TripGridColumn } from 'app/trips/enumerations/trip-grid-column.enum';

@Injectable({
  providedIn: 'root'
})
export class TripIconsService {
  // Lower-cased constants used by this service
  private readonly PROBILL_MISSING = ProbillEventStatuses.Missing.toLowerCase();
  private readonly PROBILL_WINDOW = ProbillEventStatuses.Window.toLowerCase();
  private readonly PICKUP = Events.Pickup.toLowerCase();
  private readonly DELIVER = Events.Deliver.toLowerCase();
  private readonly ACX_NOT_SUBMITTED = ACXStatuses.NotSubmitted.toLowerCase();
  private readonly ACX_SUBMITTED = ACXStatuses.Submitted.toLowerCase();
  private readonly ACX_ACCEPTED = ACXStatuses.Accepted.toLowerCase();
  private readonly ACX_ENTRY_LINKED = ACXStatuses.EntryLinked.toLowerCase();
  private readonly ACX_REJECTED = ACXStatuses.Rejected.toLowerCase();
  private readonly REEFER_WARNING = ReeferStatuses.Warning.toLowerCase();
  private readonly REEFER_OUT_OF_CONTROL =
    ReeferStatuses.OutOfControl.toLowerCase();
  private readonly MAX_MINUTES_FOR_NEXT_EVENT_DANGER = 60;

  private setAppointmentIcons(trip: Trip) {
    // If trip doesn't have any pending actions then it's not necessary to display any icon
    if (!trip?.pendingActions?.length) {
      return;
    }

    // If trip's next event isn't PickUp or Deliver then it's not necessary to display any icon
    const nextEvent = trip?.nextEventName?.toLowerCase();
    if (nextEvent !== this.PICKUP && nextEvent !== this.DELIVER) {
      return;
    }

    // Getting the status according to next event
    let probillStatus = '';
    if (nextEvent === this.PICKUP) {
      probillStatus = this.getActionByType(
        trip,
        TripAuxiliaryItems.ProbillPickUpInfo
      );
    }
    if (nextEvent === this.DELIVER) {
      probillStatus = this.getActionByType(
        trip,
        TripAuxiliaryItems.ProbillDeliverInfo
      );
    }

    // Setting values
    trip.icons.appointment.missingAppointment =
      probillStatus === this.PROBILL_MISSING;
    trip.icons.appointment.confirmedAppointment =
      probillStatus === this.PROBILL_WINDOW;
  }

  private isACXDanger(acxStatus: string): boolean {
    return (
      acxStatus?.toLowerCase() === this.ACX_NOT_SUBMITTED ||
      acxStatus?.toLowerCase() === this.ACX_REJECTED
    );
  }

  private isACXWarning(acxStatus: string): boolean {
    return (
      acxStatus?.toLowerCase() === this.ACX_SUBMITTED ||
      acxStatus?.toLowerCase() === this.ACX_ACCEPTED
    );
  }

  private isACXSuccess(acxStatus: string): boolean {
    return acxStatus?.toLowerCase() === this.ACX_ENTRY_LINKED;
  }

  private setACEIcons(trip: Trip) {
    const ace = this.getActionByType(trip, TripAuxiliaryItems.ACEStatus);
    trip.icons.ace.danger = !!ace && this.isACXDanger(ace);
    trip.icons.ace.warning = !!ace && this.isACXWarning(ace);
    trip.icons.ace.success = !!ace && this.isACXSuccess(ace);
  }

  private setACIIcons(trip: Trip) {
    const aci = this.getActionByType(trip, TripAuxiliaryItems.ACIStatus);
    trip.icons.aci.danger = !!aci && this.isACXDanger(aci);
    trip.icons.aci.warning = !!aci && this.isACXWarning(aci);
    trip.icons.aci.success = !!aci && this.isACXSuccess(aci);
  }

  private setFuelIcons(trip: Trip) {
    const action = this.getActionByType(trip, TripAuxiliaryItems.ReeferInfo);
    trip.icons.fuelWarning =
      action === this.REEFER_WARNING || action === this.REEFER_OUT_OF_CONTROL;
  }

  private setEventIcons(
    trip: Trip,
    iconDisplayState: TripEventColumnIcon,
    eventType: TripGridColumn.NextEvent | TripGridColumn.LastEvent
  ) {
    let start: Date | null;
    let eta: Date | null;
    if (eventType === TripGridColumn.LastEvent) {
      // Assigning values for start & eta that will be used by badge color loigc
      start = trip?.lastEventStart;
      eta = trip?.lastEventETA;

      // Red exclamation icon only applies to Last Event column
      const nextEventExists =
        trip?.nextEventSeqId !== null && trip?.nextEventSeqId !== undefined;
      const lastEventExists =
        trip?.lastEventSeqId !== null && trip?.lastEventSeqId !== undefined;
      const isNextLastSame = trip?.nextEventSeqId === trip?.lastEventSeqId;
      iconDisplayState.redExclamation =
        nextEventExists && lastEventExists && isNextLastSame;
    } else {
      // Assigning values for start & eta that will be used by badge color loigc
      start = trip?.nextEventStart;
      eta = trip?.nextEventETA;
    }

    // Cross icon applies for both Next & Last event columns
    const isNextEventComplete = !trip?.nextEventName;
    const isLastEventComplete = !!trip?.lastEventFinish;
    iconDisplayState.cross = isNextEventComplete && isLastEventComplete;

    // Badge colors apply for both Next & Last event columns
    if (start || eta) {
      if (start && eta) {
        // Both ETA and Start Time fields are populated
        if (eta >= start) {
          iconDisplayState.success = true;
        } else {
          const minutes = DateTimeHelper.getMinutesBetween(start, eta);
          if (minutes >= this.MAX_MINUTES_FOR_NEXT_EVENT_DANGER) {
            iconDisplayState.danger = true;
          } else {
            iconDisplayState.warning = true;
          }
        }
      } else {
        // Only one of ETA or Start Time is populated (priority is Start Time then ETA)
        const currentTime = new Date();
        const prioritizedTime = (start || eta) as Date;
        if (currentTime <= prioritizedTime) {
          iconDisplayState.success = true;
        } else {
          const minutes = DateTimeHelper.getMinutesBetween(
            currentTime,
            prioritizedTime
          );
          if (minutes >= this.MAX_MINUTES_FOR_NEXT_EVENT_DANGER) {
            iconDisplayState.danger = true;
          } else {
            iconDisplayState.warning = true;
          }
        }
      }
    } else {
      // None ETA and Start Time fields are populated
      iconDisplayState.dangerUnableCalc = true;
    }
  }

  private initializeIcons(trip: Trip) {
    const defaultIcons: TripIcon = {
      isBrandNewTrip: false,
      appointment: {
        missingAppointment: false,
        confirmedAppointment: false
      },
      ace: {
        danger: false,
        warning: false,
        success: false
      },
      aci: {
        danger: false,
        warning: false,
        success: false
      },
      fuelWarning: false,
      nextEvent: {
        cross: false,
        redExclamation: false,
        dangerUnableCalc: false,
        danger: false,
        warning: false,
        success: false
      },
      finalEvent: {
        cross: false,
        redExclamation: false,
        dangerUnableCalc: false,
        danger: false,
        warning: false,
        success: false
      }
    };
    trip.icons = defaultIcons;
  }

  getActionByType(trip: Trip, tripAction: TripAuxiliaryItems): string {
    const foundAction = (
      trip?.pendingActions?.find((a) => a.auxItem === tripAction)?.value || ''
    ).toLowerCase();
    return foundAction;
  }

  setIcons(trip: Trip) {
    this.initializeIcons(trip);
    this.setAppointmentIcons(trip);
    this.setACEIcons(trip);
    this.setACIIcons(trip);
    this.setFuelIcons(trip);
    this.setEventIcons(trip, trip.icons.nextEvent, TripGridColumn.NextEvent);
    this.setEventIcons(trip, trip.icons.finalEvent, TripGridColumn.LastEvent);
  }
}

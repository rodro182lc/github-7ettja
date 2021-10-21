import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
//import { EventBusService } from '@core/services/event-bus.service';
import { ConfirmationConfig } from '@shared/models/confirmation-config.model';
import { ConfirmationEvents } from '@shared/enumerations/core/confirmation-events.enum';
import { BusEvent } from '@shared/models/bus-event.model';
import { ConfirmationEventData } from '@shared/models/confirmation-event-data.model';

// ARCH HINT: Use this directive when you want a buton to display a confirmation dialog asking
// the user if he/she wants to proceed with certain action
/**
 * Makes the button, to which this directive is applied to, to display a confirmation dialog for example to
 * ask the user if he/she is sure to proceed with a given action.
 *
 * @remarks
 * Example to consume this directive is shown below. If the whole [dialogConfig] input is omitted then default verbiages will be used.
 * <button type="button" appConfirmation
 *      [dialogConfig]="{
 *          title: 'Custom title',
 *          question: 'Custom question',
 *          yesText: 'Custom Yes',
 *          noText: 'Custom No'
 *      }"
 *      (confirmed)="methodToCallOnConfirmation()">
 *      Open Dialog
 * </button>
 */
@Directive({
  selector: '[appConfirmation]',
  exportAs: 'appConfirmation'
})
export class ConfirmationDirective implements OnInit, OnDestroy {
  @Input() dialogConfig!: ConfirmationConfig;
  @Output() private confirmed = new EventEmitter<any>();
  @Output() private unConfirmed = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    const defaultConfig = new ConfirmationConfig();
    this.dialogConfig = this.dialogConfig || defaultConfig;
    this.dialogConfig.title = this.dialogConfig.title || defaultConfig.title;
    this.dialogConfig.question =
      this.dialogConfig.question || defaultConfig.question;
    this.dialogConfig.yesText =
      this.dialogConfig.yesText || defaultConfig.yesText;
    this.dialogConfig.noText = this.dialogConfig.noText || defaultConfig.noText;
    this.dialogConfig.isManuallyClosed =
      this.dialogConfig.isManuallyClosed === null ||
      this.dialogConfig.isManuallyClosed === undefined
        ? defaultConfig.isManuallyClosed
        : this.dialogConfig.isManuallyClosed;
    this.dialogConfig.openManually =
      this.dialogConfig.openManually === null ||
      this.dialogConfig.openManually === undefined
        ? defaultConfig.openManually
        : this.dialogConfig.openManually;
  }

  ngOnDestroy(): void {
    // The complete method in itself will also unsubscribe any possible subscriptions.
    this.confirmed.complete();
    this.unConfirmed.complete();
  }

  @HostListener('click') private onClick(): void {
    if (!this.dialogConfig.openManually) {
      this.openDialog();
    }
  }

  closeDialog(): void {
    if (this.dialogConfig.isManuallyClosed) {
    }
  }

  openDialog(): void {
    const eventData = this.getEventData();
  }

  private getEventData(): ConfirmationEventData {
    return {
      confirmationEvent: this.confirmed,
      unConfirmationEvent: this.unConfirmed,
      dialogConfig: this.dialogConfig
    };
  }
}

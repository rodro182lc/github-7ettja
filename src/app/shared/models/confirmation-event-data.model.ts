import { Subject } from 'rxjs';
import { ConfirmationConfig } from './confirmation-config.model';

export interface ConfirmationEventData {
  confirmationEvent: Subject<any>;
  unConfirmationEvent?: Subject<any>;
  dialogConfig: ConfirmationConfig;
}

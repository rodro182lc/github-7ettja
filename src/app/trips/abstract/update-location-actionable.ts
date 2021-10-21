import { FormGroup } from '@angular/forms';

export abstract class UpdateLocationActionable {
  form!: FormGroup;

  abstract finalize(): void;

  save(): void | null {
    return null;
  }
}

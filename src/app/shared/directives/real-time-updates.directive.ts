import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
//import { EventBusService } from '@core/services/event-bus.service';
import { RealTimeUpdates } from '@shared/enumerations/core/real-time-updates.enum';
import { SubSink } from 'subsink';
import { compare, Operation } from 'fast-json-patch';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appRealTimeUpdates]',
  exportAs: 'appRealTimeUpdates'
})
export class RealTimeUpdatesDirective implements OnInit, OnDestroy {
  // Input properties
  @Input() appRealTimeUpdates!: {
    sourceMapping: string;
    targetMapping: string;
    eventName: string;
    form: FormGroup;
  };

  // Private members
  private subs = new SubSink();
  private readonly conflictClass = 'real-time-conflict';
  private readonly patchedClass = 'real-time-updated';
  private readonly disclaimerClass = 'real-time-disclaimer';
  private resetFormFunc: any;

  constructor(private elementRef: ElementRef) {}

  /**
   * Analyzes the given object looking for date type properties and transform them into their
   * string represenations so the object can be easily compared
   * @param sourceObject - Object whose properties will be transformed
   */
  private replaceDatesWithStrings(sourceObject: any): void {
    for (let field in sourceObject) {
      const isDate = sourceObject[field] instanceof Date;
      if (isDate) {
        sourceObject[field] = (sourceObject[field] as Date).toISOString();
      }
    }
  }

  /**
   * Retrieves the name of the field for the given change/difference
   * @param change - Current difference being analyzed
   * @returns - Pure name of field without any slashes
   */
  private getOperationFieldName(change: Operation): string {
    let fieldName = '';
    const parts = change.path.split('/');
    if (parts?.length >= 2) {
      fieldName = parts[1];
    }
    return fieldName;
  }

  /**
   * Retrives the input control that has the given fieldName inside the given form
   * @param form - Form that contains one or more controls
   * @param fieldName - Name of the field to be looked for inside the form
   * @returns - Found input control
   */
  private getInputControl(
    form: HTMLFormElement,
    fieldName: string
  ): HTMLElement | null {
    const inputGroupControl = form.querySelector(
      `[formControlName="${fieldName}"] igx-input-group`
    ) as HTMLElement;
    if (inputGroupControl) {
      return inputGroupControl;
    }
    const inputControl = form.querySelector(
      `[formControlName="${fieldName}"] input`
    ) as HTMLElement;
    return inputControl;
  }

  /**
   * Removes all visual indicators from the form
   */
  private applyOriginalState(): void {
    const currentFormElement = this.elementRef.nativeElement as HTMLFormElement;
    const conflicts = currentFormElement.querySelectorAll(
      `.${this.conflictClass}`
    );
    const updated = currentFormElement.querySelectorAll(
      `.${this.patchedClass}`
    );
    const disclaimer = currentFormElement.querySelector(
      `.${this.disclaimerClass}`
    );
    if (conflicts?.length) {
      conflicts.forEach((c) => c.classList.remove(this.conflictClass));
    }
    if (updated?.length) {
      updated.forEach((u) => u.classList.remove(this.patchedClass));
    }
    if (disclaimer) {
      currentFormElement.removeChild(disclaimer);
    }
  }

  /**
   * Analyzes each difference to determine if current user's form needs to be patched.
   * Also displays visual indicators to let the user know that specific fields suffered changes.
   * @param updatedFormValue - Whole object containing all fields that another user posted
   * @param changes - List of differences between the current form that user is changing and
   * coming changes made by another user
   */
  private applyChanges(updatedFormValue: any, changes: Operation[]): void {
    if (!changes?.length) {
      return;
    }
    const currentNgForm = this.appRealTimeUpdates.form;
    const currentFormElement = this.elementRef.nativeElement as HTMLFormElement;
    let conflictsExist = false;
    let patchesExist = false;
    changes.forEach((currChange) => {
      const fieldName = this.getOperationFieldName(currChange);
      const formField = currentNgForm.get(fieldName);
      const inputControl = this.getInputControl(currentFormElement, fieldName);
      if (formField && inputControl) {
        if (formField.dirty) {
          conflictsExist = true;
          inputControl.classList.add(this.conflictClass);
        } else {
          patchesExist = true;
          inputControl.classList.add(this.patchedClass);
          // Not marking the field as dirty cause those changes are already
          // perissted in BE
          formField.setValue(updatedFormValue[fieldName]);
        }
      }
    });

    // Displaying the meaning of colors
    if (conflictsExist || patchesExist) {
      const visualExample = (cssClass: string) => {
        const newSpan = document.createElement('span') as HTMLSpanElement;
        newSpan.classList.add(cssClass);
        return newSpan;
      };
      const textContainer = (text: string) => {
        const newDiv = document.createElement('div') as HTMLDivElement;
        newDiv.innerText = text;
        return newDiv;
      };
      const disclaimerDiv = textContainer(
        updatedFormValue.modifiedBy
          ? `${updatedFormValue.modifiedBy} made some changes:`
          : 'Real time updates were detected:'
      );
      disclaimerDiv.classList.add(this.disclaimerClass);
      currentFormElement.appendChild(disclaimerDiv);
      if (conflictsExist) {
        const conflictsDiv = textContainer(
          'Changed by the other user and yourself, your change was not replaced.'
        );
        conflictsDiv.prepend(visualExample(this.conflictClass));
        disclaimerDiv.appendChild(conflictsDiv);
      }
      if (patchesExist) {
        const patchesDiv = textContainer(
          'Changed by the other user, automatically updated here.'
        );
        patchesDiv.prepend(visualExample(this.patchedClass));
        disclaimerDiv.appendChild(patchesDiv);
      }
    }
  }

  ngOnInit(): void {
    const currentNgForm = this.appRealTimeUpdates.form;
    const eventName = this.appRealTimeUpdates.eventName as RealTimeUpdates;
    const sourceMapping = this.appRealTimeUpdates.sourceMapping;
    const targetMapping = this.appRealTimeUpdates.targetMapping;

    // This is a work-around to detect when the form has been reset, we need this to
    // revert our stylings back to their original state: Storing reset function into
    // our variable so we can add our custom logic to it
    this.resetFormFunc = currentNgForm.reset;
    currentNgForm.reset = () => {
      // Calling form's original reset function
      this.resetFormFunc.apply(currentNgForm, arguments);
      // Removing visual indicators when the form is reset
      this.applyOriginalState();
    };

    if (eventName) {
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

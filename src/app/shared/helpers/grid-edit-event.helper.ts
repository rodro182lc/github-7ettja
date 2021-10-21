import { IGridEditEventArgs } from '@infragistics/igniteui-angular';

export abstract class GridEditEventHelper {
  private static getHtmlInput(
    eventArgs: IGridEditEventArgs
  ): HTMLInputElement | null {
    const gridCell = eventArgs.event?.target as HTMLElement;
    const inputs = gridCell.getElementsByTagName('input');
    const input = inputs?.length
      ? inputs[0]
      : (null as HTMLInputElement | null);
    return input;
  }

  static focusEditControl(eventArgs: IGridEditEventArgs): void {
    setTimeout(() => {
      if (eventArgs.event?.target) {
        const input = GridEditEventHelper.getHtmlInput(eventArgs);
        if (input) {
          input.focus();
          input.setSelectionRange(0, 0);
        }
      }
    }, 0);
  }
}

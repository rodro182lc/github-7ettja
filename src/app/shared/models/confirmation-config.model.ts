export class ConfirmationConfig {
  title?: string;
  question?: string;
  yesText?: string;
  noText?: string;
  isManuallyClosed?: boolean;
  openManually?: boolean;

  constructor() {
    this.title = 'Confirm';
    this.question = `Are you sure?`;
    this.yesText = 'Yes';
    this.noText = 'No';
    this.isManuallyClosed = false;
    this.openManually = false;
  }
}

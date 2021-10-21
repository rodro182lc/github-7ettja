import { Directive, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]',
  exportAs: 'appStopPropagation'
})
export class StopPropagationDirective implements OnInit {
  @Input() stopPropagationKeys: string[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.stopPropagationKeys.length === 0) {
      this.stopPropagationKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    }
  }

  @HostListener('keydown', ['$event']) private onKeyDown(
    event: KeyboardEvent
  ): void {
    const foundKey = this.stopPropagationKeys.indexOf(event.key) >= 0;
    if (foundKey) {
      event.stopPropagation();
    }
  }
}

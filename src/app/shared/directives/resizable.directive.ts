import {
  Directive,
  ElementRef,
  OnInit,
  Input,
  HostListener
} from '@angular/core';
@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective implements OnInit {
  @Input() resizableGrabHeight = 5;
  @Input() resizableMinHeight = 70;

  private dragging = false;
  private marginTop: number = 100;

  constructor(private el: ElementRef) {}

  @HostListener('document:mousemove', ['$event'])
  mouseMoveG(evt: MouseEvent): void {
    if (!this.dragging) {
      return;
    }
    this.newHeight(
      this.el.nativeElement.offsetTop -
        evt.clientY +
        this.el.nativeElement.clientHeight
    );
    this.pauseEvent(evt);
  }

  @HostListener('document:mouseup', ['$event'])
  mouseUpG(evt: MouseEvent): void {
    if (!this.dragging) {
      return;
    }
    this.restoreGlobalMouseEvents();
    this.dragging = false;
    evt.stopPropagation();
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(evt: MouseEvent): void {
    if (this.inDragRegion(evt)) {
      this.dragging = true;
      this.preventGlobalMouseEvents();
      evt.stopPropagation();
    }
  }
  @HostListener('mousemove', ['$event'])
  mouseMove(evt: MouseEvent): void {
    if (this.inDragRegion(evt) || this.dragging) {
      this.el.nativeElement.style.cursor = 'row-resize';
    } else {
      this.el.nativeElement.style.cursor = 'default';
    }
  }

  ngOnInit(): void {
    this.el.nativeElement.style['border-top'] =
      this.resizableGrabHeight + 'px solid darkgrey';
  }

  private inDragRegion(evt: MouseEvent): boolean {
    return (
      this.el.nativeElement.offsetTop <= evt.clientY &&
      this.el.nativeElement.offsetTop + this.resizableGrabHeight >= evt.clientY
    );
  }

  private preventGlobalMouseEvents(): void {
    document.body.style.pointerEvents = 'none';
  }

  private restoreGlobalMouseEvents() {
    document.body.style.pointerEvents = 'auto';
  }

  private newHeight(wid: number): void {
    let newHeight = Math.max(this.resizableMinHeight, wid);
    newHeight =
      document.body.offsetHeight - this.marginTop < newHeight
        ? document.body.offsetHeight - this.marginTop
        : newHeight;
    this.el.nativeElement.style.height = newHeight + 'px';
  }

  private pauseEvent(e: MouseEvent): void {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
  }
}

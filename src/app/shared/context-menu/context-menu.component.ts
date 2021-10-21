import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { ContextMenuItem } from '@shared/models/context-menu-item.model';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnDestroy {
  // ViewChild members
  @ViewChild('contextMenuElement')
  private contextMenuElement!: ElementRef;

  /**
   * Emits selected item once user selects an option in the context menu.
   */
  @Output()
  private itemSelected = new EventEmitter<{
    selectedItem: ContextMenuItem;
    associatedEntity: any;
  }>();

  // Public members
  isVisible = false;
  configuration: {
    xPosition: number;
    yPosition: number;
    menuItems: ContextMenuItem[];
    associatedEntity: any;
  } = { xPosition: 0, yPosition: 0, menuItems: [], associatedEntity: null };

  constructor() {}

  ngOnDestroy(): void {
    this.setScrollListener(false);
  }

  private setScrollListener(isActive: boolean): void {
    if (isActive) {
      window.addEventListener('scroll', this.onScroll, true);
    } else {
      window.removeEventListener('scroll', this.onScroll, true);
    }
  }

  private onScroll = () => {
    this.hide();
  };

  show(conf: {
    xPosition: number;
    yPosition: number;
    menuItems: ContextMenuItem[];
    associatedEntity: any;
  }): void {
    this.setScrollListener(true);
    const contextMenu = this.contextMenuElement.nativeElement as HTMLDivElement;
    this.configuration = conf;
    this.isVisible = true;
    setTimeout(() => {
      contextMenu.focus();
    }, 0);
  }

  hide(): void {
    this.isVisible = false;
    this.setScrollListener(false);
  }

  onMenuItemSelected(selectedItem: ContextMenuItem): void {
    this.itemSelected.emit({
      selectedItem,
      associatedEntity: this.configuration.associatedEntity
    });
    this.hide();
  }
}

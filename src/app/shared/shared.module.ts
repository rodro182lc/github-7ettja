import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DisplayDensity,
  DisplayDensityToken,
  IGX_INPUT_GROUP_TYPE,
  IgxBadgeModule,
  IgxButtonModule,
  IgxCardModule,
  IgxCheckboxModule,
  IgxComboModule,
  IgxDialogModule,
  IgxExpansionPanelModule,
  IgxGridModule,
  IgxIconModule,
  IgxLayoutModule,
  IgxMaskModule,
  IgxNavigationDrawerModule,
  IgxProgressBarModule,
  IgxRippleModule,
  IgxTabsModule,
  IgxToastModule,
  IgxToggleModule,
  IgxTooltipModule,
  IgxSplitterModule,
  IgxTimePickerModule,
  IgxSelectModule,
  IgxDateTimeEditorModule,
  IgxButtonGroupModule,
  IgxDateRangePickerModule,
  IgxActionStripModule
} from '@infragistics/igniteui-angular';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { ConfirmationDirective } from './directives/confirmation.directive';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { UsernameDisplayPipe } from './pipes/username-display.pipe';
import { SingleOptionSelectDirective } from './directives/single-option-select.directive';
import { MinutesAsHourStampPipe } from './pipes/minutes-as-hour-stamp.pipe';
import { SingleOptionDropDownDirective } from './directives/single-option-drop-down.directive';
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import { DateTimeEditorDeleteDirective } from './directives/delete-date-fix.directive';
import { GridStateDirective } from '@shared/directives/grid-state.directive';
import { GridPaginatorDirective } from './directives/grid-paginator.directive';
import { RealTimeUpdatesDirective } from './directives/real-time-updates.directive';
import { GridCopyClipboardDirective } from './directives/grid-copy-clipboard.directive';
import { ResizableDirective } from './directives/resizable.directive';

// ARCH HINT: Reference here any Ignite module as needed, preferably in alphabetical order
const igniteModules = [
  IgxActionStripModule,
  IgxBadgeModule,
  IgxButtonModule,
  IgxCardModule,
  IgxCheckboxModule,
  IgxDateTimeEditorModule,
  IgxComboModule,
  IgxDialogModule,
  IgxExpansionPanelModule,
  IgxGridModule,
  IgxIconModule,
  IgxLayoutModule,
  IgxMaskModule,
  IgxNavigationDrawerModule,
  IgxProgressBarModule,
  IgxRippleModule,
  IgxSplitterModule,
  IgxTabsModule,
  IgxToastModule,
  IgxToggleModule,
  IgxTooltipModule,
  IgxTimePickerModule,
  IgxSelectModule,
  IgxButtonGroupModule,
  IgxDateRangePickerModule
];

@NgModule({
  declarations: [
    ConfirmationDirective,
    LoadSpinnerComponent,
    ContextMenuComponent,
    UsernameDisplayPipe,
    SingleOptionSelectDirective,
    SingleOptionDropDownDirective,
    StopPropagationDirective,
    DateTimeEditorDeleteDirective,
    MinutesAsHourStampPipe,
    GridStateDirective,
    GridPaginatorDirective,
    GridCopyClipboardDirective,
    RealTimeUpdatesDirective,
    ResizableDirective
  ],
  imports: [CommonModule, ...igniteModules],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...igniteModules,
    ConfirmationDirective,
    ContextMenuComponent,
    LoadSpinnerComponent,
    UsernameDisplayPipe,
    SingleOptionSelectDirective,
    SingleOptionDropDownDirective,
    StopPropagationDirective,
    DateTimeEditorDeleteDirective,
    MinutesAsHourStampPipe,
    GridStateDirective,
    GridPaginatorDirective,
    GridCopyClipboardDirective,
    RealTimeUpdatesDirective,
    ResizableDirective
  ],
  providers: [
    UsernameDisplayPipe,
    TitleCasePipe,
    {
      // This controls the size of all ignite controls
      provide: DisplayDensityToken,
      useValue: { displayDensity: DisplayDensity.compact }
    },
    {
      // This controls the style of our ignite controls, possible values are: line (default), border, box and search
      provide: IGX_INPUT_GROUP_TYPE,
      useValue: 'line'
    }
  ]
})
export class SharedModule {}

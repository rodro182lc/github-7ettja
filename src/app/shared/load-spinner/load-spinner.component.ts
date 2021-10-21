import { Component, Input } from '@angular/core';

// ARCH HINT: Use this component to display a loading spinner in any component, by default it will be
// horizontally and vertically centered in a parent container
@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent {
  @Input() height = '50px';
}

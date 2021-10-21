import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItem } from '@shared/models/menu-item.model';
import { TripboardContainerComponent } from './tripboard-container/tripboard-container.component';

const routes: Routes = [
  {
    path: '',
    component: TripboardContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule {
  static menuItems: MenuItem[] = [
    { icon: 'local_shipping', displayText: 'Trips', routePath: '/trips' }
  ];
}

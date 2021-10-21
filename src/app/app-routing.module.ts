import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadModulesStrategy } from '@core/preload-modules.strategy';
import { Roles } from '@shared/enumerations/core/roles.enum';

const routes: Routes = [
  {
    path: 'trips',
    data: {
      preload: true, // ARCH HINT: Setting the preload flag to true will make the application to lazy load
      allowedRoles: [Roles.Dispatcher]
    },
    // this module from the begining as the user is interacting with the app
    // pre-loading makes sense if we know that this Feature Module will most likely be used
    loadChildren: () =>
      import('./trips/trips.module').then((m) => m.TripsModule)
  },
  {
    path: '',
    redirectTo: '/trips',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadModulesStrategy })
  ],
  exports: [RouterModule],
  providers: [PreloadModulesStrategy]
})
export class AppRoutingModule {}

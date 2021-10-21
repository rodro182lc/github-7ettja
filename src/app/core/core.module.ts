import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import 'automapper-ts/dist/automapper';
import { SharedModule } from '@shared/shared.module';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptor,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG
} from '@azure/msal-angular';
import {
  MSALGuardConfigFactory,
  MSALInstanceFactory,
  MSALInterceptorConfigFactory
} from './auth/auth-factories';
import { EnvService, EnvServiceProvider } from './services/env.service';
import { ApiCallInterceptor } from './interceptors/api-call.interceptor';
import { HandleHttpErrorInterceptor } from './interceptors/handle-http-error.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, HttpClientModule, SharedModule],
  exports: [RouterModule, HttpClientModule],
  providers: [
    EnvServiceProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
      deps: [EnvService]
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
      deps: [EnvService]
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiCallInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleHttpErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // ARCH HINT: Ensure that CoreModule is only loaded into AppModule
  // ARCH HINT: Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}

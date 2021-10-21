import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule, // ARCH HINT: Singleton objects (services, components that are loaded only once)
    SharedModule, // ARCH HINT: Multi-instance objects
    AppRoutingModule // ARCH HINT: Application's main routes
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

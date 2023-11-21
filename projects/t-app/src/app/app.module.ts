import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsAutocompleteComponent } from 'google-maps-autocomplete';

@NgModule({
  declarations: [AppComponent],
  imports: [
    GoogleMapsAutocompleteComponent,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

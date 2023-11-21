import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { GoogleMapsAutocompleteComponent } from 'google-maps-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GoogleMapsAutocompleteComponent,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'testapp';
  googleMapsApiKey = environment.googleMapsApiKey;

  handleAddressSelect(event: any) {
    // Define the method to handle the event
    // Handle the address selection event
    console.log(event);
  }
}

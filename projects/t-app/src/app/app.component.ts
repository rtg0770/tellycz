import { Component } from '@angular/core';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 't-app';
  googleMapsApiKey = environment.googleMapsApiKey;

  handleAddressSelect(event: any) {
    // Define the method to handle the event
    // Handle the address selection event
    console.log(event);
  }

  handleCoordinatesSelect(coords: { lat: number; lng: number }): void {
    // Handle the coordinates
    console.log(coords);
  }

  handleAddressDetailsSelect(details: any): void {
    // Handle the full address details
    console.log(details);
  }
}

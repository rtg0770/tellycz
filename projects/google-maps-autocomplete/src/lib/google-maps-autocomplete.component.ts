import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteConfigService } from './autocomplete-config.service';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { GooglePlacesService } from './google-places.service';

declare global {
  interface Window {
    initMap: () => void;
  }
}

@Component({
  selector: 'lib-google-maps-autocomplete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
  ],
  templateUrl: './google-maps-autocomplete.component.html',
  styleUrls: ['./google-maps-autocomplete.component.scss'],
})
export class GoogleMapsAutocompleteComponent implements OnInit {
  // TODO: handle Input() persistent options
  @Input() set apiKey(value: string) {
    this.configService.apiKey = value;
    this.loadGoogleMapsApi(); // Consider calling this method here if it's dependent on the apiKey
  }

  @Output() addressSelect = new EventEmitter<any>();
  @Output() coordinatesSelect = new EventEmitter<{
    lat: number;
    lng: number;
  }>();
  @Output() addressDetailsSelect = new EventEmitter<any>();
  private autocompleteService: any;
  predictions: any[] = [];

  searchControl = new FormControl();

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300) // Adjust the debounce time as needed
      )
      .subscribe((value) => this.onSearch(value));
  }

  constructor(
    private configService: AutocompleteConfigService,
    private googlePlacesService: GooglePlacesService
  ) {}

  loadGoogleMapsApi(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (window.google && window.google.maps) {
        this.initializeAutocompleteService();
        resolve();
        return;
      }

      window.initMap = () => {
        this.initializeAutocompleteService();
        resolve();
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.configService.apiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;

      script.onerror = (error) => reject(error);

      document.head.appendChild(script);
    });
  }

  onSearch(value: string): void {
    if (!value) {
      this.predictions = [];
      return;
    }

    // Set up the componentRestrictions option with the country code for the Czech Republic (CZ)
    const autocompleteRequest = {
      input: value,
      componentRestrictions: { country: 'CZ' },
    };

    // Use the autocomplete service to get predictions
    this.autocompleteService.getPlacePredictions(
      autocompleteRequest,
      (predictions: any[], status: google.maps.places.PlacesServiceStatus) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.predictions = predictions;
        } else if (
          status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
        ) {
          // Handle no results scenario, for example by clearing current predictions
          this.predictions = [];
          // Optionally, inform the user that no results were found
          // This could be done via a user-friendly message in the UI
        } else {
          // For other statuses, you might want to handle them differently
          // You might log these in the server logs instead of the browser console
          this.predictions = [];
          // Log error to server or handle it according to your application's needs
          this.handleAutocompleteError(status);
        }
      }
    );
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    const prediction = event.option.value;
    this.addressSelect.emit(prediction); // Emit raw prediction

    const placeId = prediction.place_id;
    this.emitLatLng(placeId);
    this.emitAddressDetails(placeId);
  }

  /** Emmits the prediction raw formated
  onSelect(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    // If logging the event reveals that the structure is different, adjust the following line accordingly.
    const prediction = event.option.value;
    this.addressSelect.emit(prediction);
    this.predictions = [];
  }
  */

  /** Emmits coordinates
  onSelect(event: MatAutocompleteSelectedEvent): void {
    const placeId = event.option.value.place_id;

    this.getLatLngFromPrediction(placeId)
      .then((coords) => {
        console.log('Latitude:', coords.lat, 'Longitude:', coords.lng);
        // Now you can emit these coordinates, or do whatever you need with them
      })
      .catch((errorStatus) => {
        console.error('Error fetching place details:', errorStatus);
      });
  }
  */

  initializeAutocompleteService() {
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  displayFn(prediction: any): string {
    return prediction && prediction.description ? prediction.description : '';
  }

  private handleAutocompleteError(
    status: google.maps.places.PlacesServiceStatus
  ) {
    // Implement logic to log this to a server or another error reporting service
    // This is a stub and should be replaced with actual error handling logic
    console.log('A non-ZERO_RESULTS error occurred in Autocomplete: ', status);
  }

  private emitLatLng(placeId: string): void {
    this.googlePlacesService
      .getLatLng(placeId)
      .then((coords) => {
        this.coordinatesSelect.emit(coords);
      })
      .catch((errorStatus) => {
        // Handle the error appropriately
      });
  }

  private emitAddressDetails(placeId: string): void {
    this.googlePlacesService
      .getAddressDetails(placeId)
      .then((details) => {
        const formattedAddress = details.formatted_address;
        // Now you can emit just the formatted address instead of the entire details object
        this.addressDetailsSelect.emit(formattedAddress);
      })
      .catch((errorStatus) => {
        // Handle the error appropriately, e.g., you might want to notify the user
        console.error('Error fetching place details:', errorStatus);
      });
  }
}

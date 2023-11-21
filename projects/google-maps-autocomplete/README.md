# Google Maps Autocomplete Component

This Angular component provides an easy-to-use interface for the Google Maps Autocomplete functionality. Users can select an address from the dropdown that appears as they type, and various outputs provide the address, coordinates, and full address details.

## Features

- Autocomplete input for addresses using Google Maps API
- Outputs for selected address, coordinates, and detailed address information
- Configurable country restriction for autocomplete results

## Installation

Install the component using npm:

npm install @rng077/google-maps-autocomplete --save

## Usage

First, set your Google Maps API key and optional country code in the parent component:

// In your parent component
googleMapsApiKey = environment.googleMapsApiKey;
selectedCountryCode: string = 'CZ'; // Default country code, change as needed

Then, implement the event handlers in your parent component:

// Also in your parent component
handleAddressSelect(event: any) {
// Handle the address selection event
console.log(event);
}

handleCoordinatesSelect(coords: { lat: number; lng: number }): void {
// Handle the coordinates select event
console.log(coords);
}

handleAddressDetailsSelect(details: any): void {
// Handle the address details select event
console.log(details);
}

In your parent component's HTML template, use the component as follows:
<lib-google-maps-autocomplete
[apiKey]="googleMapsApiKey"
[countryCode]="selectedCountryCode"
(addressSelect)="handleAddressSelect($event)"
  (coordinatesSelect)="handleCoordinatesSelect($event)"
(addressDetailsSelect)="handleAddressDetailsSelect($event)"

> </lib-google-maps-autocomplete>

Make sure you have the required CSS to style the autocomplete component, or customize it as needed.

## Inputs and Outputs

    apiKey: Your API key for Google Maps services.
    countryCode: (Optional) Restricts predictions to the specified country (ISO 3166-1 Alpha-2 country code, e.g., 'US', 'CZ').

## Outputs

    addressSelect: Emits the raw address prediction object when a place is selected.
    coordinatesSelect: Emits the coordinates (latitude and longitude) of the selected place.
    addressDetailsSelect: Emits the formatted address details of the selected place.

For more details, refer to the Google Maps Autocomplete documentation.

## Contributing

Contributions are welcome. Please submit a pull request or create an issue for any features or bug fixes.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

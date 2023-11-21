import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GooglePlacesService {
  private placesService: google.maps.places.PlacesService | null = null;

  constructor() {}

  private ensurePlacesService() {
    if (!this.placesService) {
      // Ensure the Google Maps API script has loaded.
      if (typeof google === 'undefined' || !google.maps.places) {
        throw new Error('Google Maps JavaScript API has not been loaded.');
      }
      const div = document.createElement('div');
      this.placesService = new google.maps.places.PlacesService(div);
    }
  }

  getLatLng(placeId: string): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      );

      service.getDetails({ placeId: placeId }, (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          resolve({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        } else {
          reject(
            new Error(
              'Place details request failed or place/geometry/location is undefined.'
            )
          );
        }
      });
    });
  }

  getAddressDetails(placeId: string): Promise<google.maps.places.PlaceResult> {
    this.ensurePlacesService();
    return new Promise((resolve, reject) => {
      // Assuming this.placesService is now initialized
      this.placesService!.getDetails({ placeId: placeId }, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          resolve(result);
        } else {
          reject(new Error('Failed to load place details: ' + status));
        }
      });
    });
  }
}

# Tellycz

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Setup

Before using the `GoogleMapsAutocompleteComponent`, you need to provide your Google Maps API key:

1. Obtain an API key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview).
2. Place your API key in the `src/environments/environment.ts` and `src/environments/environment.prod.ts` files of your Angular project:

```typescript
// In your environment.ts
export const environment = {
  // ...
  googleMapsApiKey: 'YOUR_API_KEY_HERE', // Replace with your Google Maps API key
};

// In your environment.prod.ts
export const environment = {
  // ...
  googleMapsApiKey: 'YOUR_API_KEY_HERE', // Replace with your Google Maps API key
};

3. Run `ng build google-maps-autocomplete`

4. Run `ng serve t-app`

By following these steps, users of your component will be responsible for adding their own API keys in a secure manner, which helps prevent accidental exposure of sensitive data and ensures that your component remains flexible for different environments and use cases.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
```

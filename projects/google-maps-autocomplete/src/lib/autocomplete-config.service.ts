import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteConfigService {
  private _apiKey!: string;

  constructor() {}

  set apiKey(key: string) {
    this._apiKey = key;
  }

  get apiKey(): string {
    return this._apiKey;
  }
}

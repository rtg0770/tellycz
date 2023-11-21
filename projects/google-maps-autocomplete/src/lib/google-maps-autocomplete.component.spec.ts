import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsAutocompleteComponent } from './google-maps-autocomplete.component';

describe('GoogleMapsAutocompleteComponent', () => {
  let component: GoogleMapsAutocompleteComponent;
  let fixture: ComponentFixture<GoogleMapsAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleMapsAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleMapsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

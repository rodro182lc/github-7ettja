import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripEventsComponent } from './tripevents.component';

describe('TripEventsComponent', () => {
  let component: TripEventsComponent;
  let fixture: ComponentFixture<TripEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripEventsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

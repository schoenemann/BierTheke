import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedOfferReceiver } from './accepted-offer-receiver';

describe('AcceptedOfferReceiver', () => {
  let component: AcceptedOfferReceiver;
  let fixture: ComponentFixture<AcceptedOfferReceiver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedOfferReceiver],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptedOfferReceiver);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

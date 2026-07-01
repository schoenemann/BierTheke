import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BierEvent } from './bier-event';

describe('BierEvent', () => {
  let component: BierEvent;
  let fixture: ComponentFixture<BierEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BierEvent],
    }).compileComponents();

    fixture = TestBed.createComponent(BierEvent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

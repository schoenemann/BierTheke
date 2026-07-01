import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiergitComponent } from './biergit-component';

describe('BiergitComponent', () => {
  let component: BiergitComponent;
  let fixture: ComponentFixture<BiergitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiergitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiergitComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

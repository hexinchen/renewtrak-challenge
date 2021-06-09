import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTermCardComponent } from './mobile-term-card.component';

describe('MobileTermCardComponent', () => {
  let component: MobileTermCardComponent;
  let fixture: ComponentFixture<MobileTermCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileTermCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTermCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

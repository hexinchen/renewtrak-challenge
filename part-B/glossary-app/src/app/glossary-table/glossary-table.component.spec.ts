import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryTableComponent } from './glossary-table.component';

describe('GlossaryTableComponent', () => {
  let component: GlossaryTableComponent;
  let fixture: ComponentFixture<GlossaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlossaryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlossaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTermDialogComponent } from './add-new-term-dialog.component';

describe('AddNewTermDialogComponent', () => {
  let component: AddNewTermDialogComponent;
  let fixture: ComponentFixture<AddNewTermDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTermDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTermDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

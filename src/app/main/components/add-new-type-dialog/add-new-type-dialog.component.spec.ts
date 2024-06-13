import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTypeDialogComponent } from './add-new-type-dialog.component';

describe('AddNewTypeDialogComponent', () => {
  let component: AddNewTypeDialogComponent;
  let fixture: ComponentFixture<AddNewTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewTypeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

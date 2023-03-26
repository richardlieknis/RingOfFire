import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowErrorComponent } from './dialog-show-error.component';

describe('DialogShowErrorComponent', () => {
  let component: DialogShowErrorComponent;
  let fixture: ComponentFixture<DialogShowErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogShowErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvendorchallanComponent } from './viewvendorchallan.component';

describe('ViewvendorchallanComponent', () => {
  let component: ViewvendorchallanComponent;
  let fixture: ComponentFixture<ViewvendorchallanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewvendorchallanComponent]
    });
    fixture = TestBed.createComponent(ViewvendorchallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

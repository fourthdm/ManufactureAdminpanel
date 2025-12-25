import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdeliverychallanComponent } from './viewdeliverychallan.component';

describe('ViewdeliverychallanComponent', () => {
  let component: ViewdeliverychallanComponent;
  let fixture: ComponentFixture<ViewdeliverychallanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewdeliverychallanComponent]
    });
    fixture = TestBed.createComponent(ViewdeliverychallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

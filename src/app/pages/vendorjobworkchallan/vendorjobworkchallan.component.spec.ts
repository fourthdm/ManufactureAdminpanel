import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorjobworkchallanComponent } from './vendorjobworkchallan.component';

describe('VendorjobworkchallanComponent', () => {
  let component: VendorjobworkchallanComponent;
  let fixture: ComponentFixture<VendorjobworkchallanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorjobworkchallanComponent]
    });
    fixture = TestBed.createComponent(VendorjobworkchallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

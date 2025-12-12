import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsssignjobComponent } from './asssignjob.component';

describe('AsssignjobComponent', () => {
  let component: AsssignjobComponent;
  let fixture: ComponentFixture<AsssignjobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsssignjobComponent]
    });
    fixture = TestBed.createComponent(AsssignjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewemployeeComponent } from './viewemployee.component';

describe('ViewemployeeComponent', () => {
  let component: ViewemployeeComponent;
  let fixture: ComponentFixture<ViewemployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewemployeeComponent]
    });
    fixture = TestBed.createComponent(ViewemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

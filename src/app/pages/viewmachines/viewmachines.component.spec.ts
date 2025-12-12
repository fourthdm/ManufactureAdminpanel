import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmachinesComponent } from './viewmachines.component';

describe('ViewmachinesComponent', () => {
  let component: ViewmachinesComponent;
  let fixture: ComponentFixture<ViewmachinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewmachinesComponent]
    });
    fixture = TestBed.createComponent(ViewmachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

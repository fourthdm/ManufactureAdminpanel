import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerjobComponent } from './designerjob.component';

describe('DesignerjobComponent', () => {
  let component: DesignerjobComponent;
  let fixture: ComponentFixture<DesignerjobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerjobComponent]
    });
    fixture = TestBed.createComponent(DesignerjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

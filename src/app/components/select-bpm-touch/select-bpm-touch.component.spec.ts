import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBpmTouchComponent } from './select-bpm-touch.component';

describe('SelectBpmTouchComponent', () => {
  let component: SelectBpmTouchComponent;
  let fixture: ComponentFixture<SelectBpmTouchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBpmTouchComponent]
    });
    fixture = TestBed.createComponent(SelectBpmTouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

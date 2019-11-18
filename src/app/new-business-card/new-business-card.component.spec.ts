import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinessCardComponent } from './new-business-card.component';

describe('NewBusinessCardComponent', () => {
  let component: NewBusinessCardComponent;
  let fixture: ComponentFixture<NewBusinessCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBusinessCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusinessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

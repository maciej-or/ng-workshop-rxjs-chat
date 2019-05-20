import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpammerComponent } from './spammer.component';

describe('SpammerComponent', () => {
  let component: SpammerComponent;
  let fixture: ComponentFixture<SpammerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpammerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpammerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

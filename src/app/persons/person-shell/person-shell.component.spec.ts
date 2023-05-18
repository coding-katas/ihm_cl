import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonShellComponent } from './person-shell.component';

describe('PersonShellComponent', () => {
  let component: PersonShellComponent;
  let fixture: ComponentFixture<PersonShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSignupComponent } from './google-signup.component';

describe('GoogleSignupComponent', () => {
  let component: GoogleSignupComponent;
  let fixture: ComponentFixture<GoogleSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

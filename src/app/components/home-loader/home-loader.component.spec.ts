import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoaderComponent } from './home-loader.component';

describe('HomeLoaderComponent', () => {
  let component: HomeLoaderComponent;
  let fixture: ComponentFixture<HomeLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

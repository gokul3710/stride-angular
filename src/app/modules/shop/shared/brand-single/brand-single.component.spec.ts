import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSingleComponent } from './brand-single.component';

describe('BrandSingleComponent', () => {
  let component: BrandSingleComponent;
  let fixture: ComponentFixture<BrandSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

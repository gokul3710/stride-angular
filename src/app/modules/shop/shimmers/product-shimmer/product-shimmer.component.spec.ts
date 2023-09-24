import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShimmerComponent } from './product-shimmer.component';

describe('ProductShimmerComponent', () => {
  let component: ProductShimmerComponent;
  let fixture: ComponentFixture<ProductShimmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShimmerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

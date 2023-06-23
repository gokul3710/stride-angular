import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageShimmerComponent } from './product-page-shimmer.component';

describe('ProductPageShimmerComponent', () => {
  let component: ProductPageShimmerComponent;
  let fixture: ComponentFixture<ProductPageShimmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductPageShimmerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPageShimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

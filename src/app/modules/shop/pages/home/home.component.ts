import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { productModel } from 'src/app/core/models/product.model';
import { Observable, map } from 'rxjs';
import { brandModel } from 'src/app/core/models/brand.model';
import { bannerModel } from 'src/app/core/models/banner.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //properties
  topBrandProducts$: Observable<productModel[]>
  brands$: Observable<brandModel[]> 
  banners$: Observable<bannerModel[]> 
  offerProducts$: Observable<productModel[]>

  //loader
  // @ViewChild('loader') loader: ElementRef<HTMLDivElement>

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.topBrandProducts$ = this.productService.products.pipe(
      map((products) => {
        return products.filter((product: productModel) => {
          return product.brand === "nike" || product.brand === "adidas" || product.brand === "puma"
        })
      })
    )

    this.offerProducts$ = this.productService.products.pipe(
      map((products) => {
        return products.filter((product) => {
          let percentage = (product.price + 3000) / product.price;
          percentage = (percentage - 1) * 100;
          percentage = Math.floor(percentage);
          if (percentage >= 30) {
            return true;
          }
          return false;
        }).sort((a, b) => a.price - b.price);
      })
    )

    this.brands$ = this.productService.brands

    this.banners$ = this.productService.banners
  }


  // onLoad() {
  //   setTimeout(() => {
  //     this.loader.nativeElement.style.display = 'none'
  //   }, 1500);
  // }
}

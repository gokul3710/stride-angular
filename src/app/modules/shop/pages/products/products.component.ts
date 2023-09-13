import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { productModel } from 'src/app/core/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { solid } from '../../../../core/icons/solid.icons';
import { brandModel } from 'src/app/core/models/brand.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: productModel[] = []
  brands$: Observable<brandModel[]>
  solid = solid

  @ViewChild('filter') filter: ElementRef<HTMLDivElement>

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  //subscriptions
  paramsSubscription!: Subscription
  getFilterProductsSubscription!: Subscription

  pageCount: number = 1
  productsCount!: number

  selectedSort: number = 0
  selectedPrice: number = 0
  selectedBrands: Array<string> = []

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: any) => {
        this.products = []
        let brands = params?.brand
        if (Object.keys(params).length !== 0) {
          if (brands) {
            if (typeof brands === 'string') {
              this.selectedBrands = [brands]
            } else {
              this.selectedBrands = brands
            }
          } else {
            this.selectedBrands = []
          }
        } else {
          this.selectedBrands = []
          this.selectedPrice = 0
          this.selectedSort = 0
        }

        this.productService.getFilterProducts(params, 1).subscribe(
          (response) => {
            if (!response.products?.length) {
              this.products = null
              this.productsCount = 0
            } else {
              this.products = response.products
              this.productsCount = response.productsCount
            }
          }
        )
      }
    )

    this.brands$ = this.productService.brands

  }

  changePageCount(count: number) {
    if (this.pageCount + count > 0 && this.pageCount + count < Math.ceil(this.productsCount / 12) + 1) {
      this.products = []
      this.pageCount += count
      this.route.queryParams.subscribe(
        (params) => {
          this.productService.getFilterProducts(params, this.pageCount).subscribe(
            (response) => {
              if (!response.products?.length) {
                this.products = null
                this.productsCount = 0
              } else {
                this.products = response.products
                this.productsCount = response.productsCount
              }
            }
          )
        }
      )
    }
  }

  getRoute(key: string, value: string | string[], selected: number) {
    this.products = []
    if (key === 'price') {
      this.selectedPrice = selected
    } else {
      this.selectedSort = selected
    }

    let queryObj = this.route.snapshot.queryParams;
    queryObj = JSON.parse(JSON.stringify(queryObj));

    if (!value) {
      delete queryObj[key]
    } else if (typeof value === 'string') {
      queryObj[key] = value
    } else {
      queryObj[key] = value
    }

    const queryParamsString = new HttpParams({ fromObject: queryObj }).toString();

    let link = '/shop?' + queryParamsString
    this.pageCount = 1
    this.router.navigateByUrl(link)
  }

  getBrand(brand?: string) {
    let queryObj = this.route.snapshot.queryParams;
    queryObj = JSON.parse(JSON.stringify(queryObj));
    if (!brand) {
      delete queryObj['brand']
    } else {
      if (queryObj['brand']) {
        if (typeof queryObj['brand'] === 'string') {
          if (queryObj['brand'] === brand) {
            delete queryObj['brand']
          } else {
            queryObj['brand'] = [queryObj['brand'], brand]
          }
        } else {
          if (queryObj['brand'].includes(brand)) {
            queryObj['brand'] = queryObj['brand'].filter(qBrand => qBrand != brand)
          } else {
            queryObj['brand'] = [...queryObj['brand'], brand]
          }
        }
      } else {
        queryObj['brand'] = brand
      }
    }

    const queryParamsString = new HttpParams({ fromObject: queryObj }).toString();

    let link: string;
    if (queryParamsString) {
      link = '/shop?' + queryParamsString
    } else {
      link = '/shop'
      this.selectedPrice = 0
      this.selectedSort = 0
      this.selectedBrands = []
    }
    this.pageCount = 1
    this.router.navigateByUrl(link)

  }

  showFilter() {
    this.filter.nativeElement.classList.toggle('show')
  }

  // ngOnDestroy(){
  //   this.paramsSubscription.unsubscribe()
  //   this.getFilterProductsSubscription.unsubscribe()
  // }

}

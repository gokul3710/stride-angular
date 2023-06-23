import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { bannerModel } from 'src/app/models/banner.model';
import { brandModel } from 'src/app/models/brand.model';
import { productModel } from 'src/app/models/product.model';
import { host } from 'src/environments/environment';
import { Routes } from 'src/environments/routes';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products$ : BehaviorSubject<productModel[]> = new BehaviorSubject([])

  private filteredProducts$: BehaviorSubject<productModel[]> = new BehaviorSubject([])

  private searchProducts$ : BehaviorSubject<productModel[]> = new BehaviorSubject([])

  private brands$: BehaviorSubject<brandModel[]> = new BehaviorSubject([])

  private banners$ : BehaviorSubject<bannerModel[]> = new BehaviorSubject([])

  constructor(private http: HttpClient) {
    this.fetchProducts()
    this.fetchBanners()
    this.fetchBrands()
  }

  fetchProducts(): void{
    this.http.get<productModel[]>(`${host}${Routes.GET_PRODUCTS}`).subscribe({
      next: (response) => {
        console.log(response);
        this.products$.next(response)
      },
      error: (err: HttpErrorResponse) => {
          console.log(err.error);
      }
    });
  }

  fetchFilteredProducts(filters: any,count?: number): void{
    this.http.post<productModel[]>(`${host}${Routes.FILTER_PRODUCT}/${count}`,filters).subscribe({
      next: (filteredProducts) => {
        this.filteredProducts$.next(filteredProducts)
      },
      error: (err: HttpErrorResponse) => {
          console.log(err.error);
      }
    });
  }

  fetchSearchProducts(searchString: string): void{
    this.http.post<productModel[]>(`${host}${Routes.SEARCH_PRODUCT}`,{searchString}).subscribe({
      next: (searchProducts) => {
        this.searchProducts$.next(searchProducts.slice(0,12))
      },
      error: (err: HttpErrorResponse) => {
          console.log(err.error);
      }
    });
  }

  fetchBrands(): void{
    this.http.get<brandModel[]>(`${host}${Routes.GET_BRANDS}`).subscribe({
      next: (brands) => {
        this.brands$.next(brands)
      },
      error: (err: HttpErrorResponse) => {
          console.log(err.error);
      }
    });
  }

  fetchBanners(): void{
    this.http.get<bannerModel[]>(`${host}${Routes.GET_BANNERS}`).subscribe({
      next: (banners) => {
        this.banners$.next(banners)
      },
      error: (err: HttpErrorResponse) => {
          console.log(err.error);
      }
    });
  }

  get products(): Observable<productModel[]>{
    return this.products$
  }

  get banners(): Observable<bannerModel[]>{
    return this.banners$
  }

  get brands(): Observable<brandModel[]>{
    return this.brands$
  }

  getProductById(productId: string): Observable<productModel> {
    return this.products$.pipe(
      map((products) => products.find((product) => product._id === productId))
    );
  }

  getProductsByBrand(brand: string): Observable<productModel[]> {
    return this.products$.pipe(
      map((products) => products.filter((product) => product.brand === brand))
    );
  }

  getFilterProducts(filters: any,count?: number){
    return this.http.post<{products: productModel[], productsCount: number}>(`${host}${Routes.FILTER_PRODUCT}/${count}`,filters)
  }

  getSearchProduct(searchString: string){
    return this.http.post<productModel[]>(`${host}${Routes.SEARCH_PRODUCT}`,{searchString})
  }
}

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandSingleComponent } from './components/brand-single/brand-single.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { TrendingProductsComponent } from './components/trending-products/trending-products.component';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { ProductsComponent } from './pages/products/products.component';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { NotificationComponent } from './components/notification/notification.component';
import { BannersComponent } from './components/banners/banners.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchComponent } from './pages/search/search.component';
import { ProductOfferPipe } from '../../shared/pipes/product-offer.pipe';
import { ProductShimmerComponent } from './shimmers/shimmer-components/product-shimmer/product-shimmer.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ShopComponent,
    FooterComponent,
    HomeComponent,
    WishlistComponent,
    HeaderComponent,
    BrandsComponent,
    BrandSingleComponent,
    ProductCardComponent,
    ProductsListComponent,
    TrendingProductsComponent,
    ButtonPrimaryComponent,
    ProductsComponent,
    TimeAgoPipe,
    NotificationComponent,
    BannersComponent,
    LoaderComponent,
    SearchComponent,
    ProductShimmerComponent,
    ProductOfferPipe,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    RouterModule.forChild([]),
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    ProductsListComponent,
    ProductCardComponent
  ],
  providers: [
    TimeAgoPipe,
    DatePipe,
    ProductOfferPipe
  ],
})
export class ShopModule { }

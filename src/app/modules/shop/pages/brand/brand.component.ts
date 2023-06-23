import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { productModel } from 'src/app/models/product.model';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShopModule } from '../../shop.module';
import { solid } from 'src/app/icons/solid.icons';


@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, ShopModule],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  providers: [ProductService]
})
export class BrandComponent implements OnInit,OnDestroy {
  products$!: Observable<productModel[]>
  solid = solid
  param!: string

  constructor(private productService: ProductService, private route: ActivatedRoute, private location: Location){}

  //subscriptions
  paramsSubscription!: Subscription
  getFilterProductsSubscription!: Subscription

  ngOnInit(): void {
       this.paramsSubscription = this.route.paramMap.subscribe(
        (params)=>{
          this.param = params.get('brand')!
           this.products$ = this.productService.getProductsByBrand(this.param)
        }
      )
  }

  goBack(){
    this.location.back()
  }

  ngOnDestroy(): void {
      this.paramsSubscription.unsubscribe()
  }

}

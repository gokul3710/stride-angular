import { Component, Input} from '@angular/core';
import { faCartShopping, faPlus, faShare, faStar, faHeart, faEye, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { productModel } from 'src/app/core/models/product.model';
import { domain, host } from 'src/environments/environment';
import { CartService } from '../../../account/services/cart.service';
import { ProductOfferPipe } from '../../../../shared/pipes/product-offer.pipe';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers: [ProductOfferPipe]
})
export class ProductCardComponent {

  host = host
  domain = domain

  //icons
  faStar = faStar
  faPlus = faPlus
  faCartShopping =faCartShopping
  faHeart = faHeart
  faEye= faEye
  faShare = faShare 
  faShareNodes= faShareNodes

  @Input() product!: productModel

  constructor(private cartService: CartService){}

  handleAddToCart(){
    this.cartService.addProductToCart(this.product,1)
  }

  share() {
    if (navigator.share) {
      navigator.share({
        title: this.product.brand + " " + this.product.model,
        text: this.product.description,
        url: this.domain+'/product/'+this.product._id,
      })
        .then(() => console.log('Share successful'))
        .catch((error) => console.log('Share failed', error));
    } else {
      console.log('Web Share API not supported');
    }
  }
}

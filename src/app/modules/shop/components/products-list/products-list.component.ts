import { Component, Input } from '@angular/core';
import { productModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  @Input() title!: string
  @Input() products!: productModel[]
}

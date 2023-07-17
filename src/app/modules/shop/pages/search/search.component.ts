import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { productModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products!: productModel[]

  constructor(private productService: ProductService){}

  ngOnInit(): void {
      this.handleSearch({target: {value: ""}})
  }

  handleSearch(event: any){
    this.productService.getSearchProduct(event.target.value).subscribe(
      (response)=>{
        this.products = response
      }
    )
  }
}

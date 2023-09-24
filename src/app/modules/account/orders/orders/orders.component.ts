import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OrderService } from '../../services/orders/order.service';
import { Observable } from 'rxjs';
import { host } from 'src/environments/environment';
import { orderModel } from 'src/app/core/models/order.model';
import { solid } from 'src/app/core/icons/solid.icons';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  //icons
  solid = solid

  //properties
  orders$!: Observable<orderModel[]>;
  host = host

  constructor(private location: Location, private orderService: OrderService){}

  ngOnInit(){
    this.orders$ = this.orderService.orders
  }

  goBack(){
    this.location.back() 
  }

}

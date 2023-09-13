import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Observable, Subscription } from 'rxjs';
import { GetMRPPipe } from '../../../../shared/pipes/get-mrp.pipe';
import { GetTaxPipe } from '../../../../shared/pipes/get-tax.pipe';
import { host } from '../../../../../environments/environment';
import { orderModel } from 'src/app/core/models/order.model';
import { solid } from 'src/app/core/icons/solid.icons';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [GetMRPPipe, GetTaxPipe]
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  //properties
  orderId!: string
  solid = solid
  order$!: Observable<orderModel>
  host = host

  //modal
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>

  //subscriptions
  paramsSubscription!: Subscription

  constructor(private route: ActivatedRoute, private location: Location, private orderService: OrderService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe(
      async (params) => {
        this.orderId = params.get('id')!
        this.orderService.fetchOrders()
        this.order$ = this.orderService.getOrder(this.orderId)
      }
    )
  }

  goBack() {
    this.location.back()
  }

  showModal() {
    this.modal.nativeElement.showModal()
  }

  onConfirm(confirmed: boolean) {
    if (confirmed) {
      this.orderService.cancelOrder(this.orderId)
      this.modal.nativeElement.close()
    } else {
      this.modal.nativeElement.close()
    }
  }

  ngOnDestroy() {

    this.paramsSubscription.unsubscribe()
  }
}

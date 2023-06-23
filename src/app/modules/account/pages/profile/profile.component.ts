import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../../services/user-account.service';
import { host } from 'src/environments/environment';
import { userModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { orderModel } from 'src/app/models/order.model';
import { OrderService } from '../../services/order.service';
import { solid } from 'src/app/icons/solid.icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //properties
  user$!: Observable<userModel>
  deliveredOrders$!: Observable<orderModel[]>
  host = host

  //icons
  solid = solid

  constructor(private userAccountService: UserAccountService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.user$ = this.userAccountService.user
    this.deliveredOrders$ = this.orderService.deliveredOrders
  }

  getUserImage(image: string | undefined): string {
    if (image) {
      if (image.includes('http')) {
        return image
      } else {
        return `${host}/image/${image}`
      }
    }
    return ''
  }

  logout() {
    this.userAccountService.logout()
  }

}

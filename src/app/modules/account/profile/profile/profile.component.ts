import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../../services/user-account.service';
import { host } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { userModel } from 'src/app/core/models/user.model';
import { orderModel } from 'src/app/core/models/order.model';
import { solid } from 'src/app/core/icons/solid.icons';


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

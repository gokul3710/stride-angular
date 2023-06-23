import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { host } from 'src/environments/environment';
import { Router } from '@angular/router';
import { notificationModel } from 'src/app/models/notification.model';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [TimeAgoPipe]
})
export class NotificationComponent implements OnInit {

  //properties
  host = host
  body!: HTMLBodyElement

  @Input() notifications: notificationModel[]
  @Input() newNotifications!: number

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.body = this.renderer.selectRootElement('body', true);
  }

  onClick(product?: any) {
    if (product) {
      this.body.style.overflow = 'scroll'
      this.router.navigateByUrl(`/product/${product}`)
    }
  }
}

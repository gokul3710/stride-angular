import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appscrollReset]'
})
export class ScrollResetDirective implements OnInit,OnDestroy {

  routerEventSubscription!: Subscription
  
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.routerEventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe()  
  }
}

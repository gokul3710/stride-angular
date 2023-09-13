import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { LoggerService } from './shared/services/logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  @ViewChild('loader') loader : ElementRef<HTMLDivElement>

  constructor(private location: Location, private logger: LoggerService) {
    this.location.onUrlChange((url: string) => {
      this.logger.log(`User navigated to: ${url}`);
    });
  }

  ngOnInit(): void {
    this.onLoad()
  }

  onLoad(){
    setTimeout(() => {
      this.loader.nativeElement.style.display = 'none'
    }, 2000);
  }
}

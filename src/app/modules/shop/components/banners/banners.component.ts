import { Component , Input } from '@angular/core';
import { host } from 'src/environments/environment';
import { bannerModel } from 'src/app/models/banner.model';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent {

  @Input() banners: bannerModel[]
  host = host

}

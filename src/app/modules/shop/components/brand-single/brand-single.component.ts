import { Component, Input } from '@angular/core';
import { host } from '../../../../../environments/environment';
import { brandModel } from 'src/app/models/brand.model';

@Component({
  selector: 'app-brand-single',
  templateUrl: './brand-single.component.html',
  styleUrls: ['./brand-single.component.css']
})
export class BrandSingleComponent {
  host = host
  @Input() brand: brandModel
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { addressModel } from 'src/app/core/models/address.model';
import { solid } from 'src/app/core/icons/solid.icons';

export interface clickEvent {
  action: 'default' | 'delete',
  addressId: string
}

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent {

  @Input() address!: addressModel
  @Input() default!: boolean

  @Output() event: EventEmitter<clickEvent> = new EventEmitter()
  solid = solid

  setAsDefault(addressId: string){
    this.event.emit({action: 'default', addressId})
  }

  delete(addressId: string){
    this.event.emit({action: 'delete', addressId})
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input() text!: string

  @Output() confirmed = new EventEmitter<boolean>();

  onConfirm() {
    console.log(true);
    
    this.confirmed.emit(true);
  }

  onCancel() {
    console.log(false);
    this.confirmed.emit(false);
  }

}

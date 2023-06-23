import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: string | null): string {
    if (!value) {
      return '';
    }
  
    const date = new Date(value);
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
  
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }
  
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
  
    const days = Math.floor(diff / 86400000);
    if (days < 7) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  
    return this.datePipe.transform(value, 'MMM d, y') ?? '';
  }
  
}

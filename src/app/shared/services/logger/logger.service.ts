import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string): void {
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    logs.push(message);
    localStorage.setItem('logs', JSON.stringify(logs));
  }

  getLogs(): string[] {
    return JSON.parse(localStorage.getItem('logs')) || [];
  }

  clearLogs(): void {
    localStorage.removeItem('logs');
  }
}

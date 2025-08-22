import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService = inject(MessageService);

  show(
    severity: ToastSeverity,
    summary: string,
    detail: string,
    life = 3000
  ) {
    this.messageService.add({ severity, summary, detail, life });
  }

  success(summary: string, detail: string, life?: number) {
    this.show('success', summary, detail, life);
  }

  info(summary: string, detail: string, life?: number) {
    this.show('info', summary, detail, life);
  }

  warn(summary: string, detail: string, life?: number) {
    this.show('warn', summary, detail, life);
  }

  error(summary: string, detail: string, life?: number) {
    this.show('error', summary, detail, life);
  }

  clear() {
    this.messageService.clear();
  }
}

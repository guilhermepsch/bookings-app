import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

export function httpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const messageService = inject(MessageService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = error.error?.message || error.statusText || 'Unknown error';
      messageService.add({
        severity: 'error',
        summary: `HTTP ${error.status}`,
        detail: message,
        life: 5000,
      });
      return throwError(() => error);
    })
  );
}

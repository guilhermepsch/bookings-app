import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInDto, SignInResponseSchema } from '@bookings-app/shared-types';
import { GenericResponseOf } from '@bookings-app/shared-types';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/auth';

  login(payload: SignInDto): Observable<GenericResponseOf<typeof SignInResponseSchema>> {
    return this.http.post<GenericResponseOf<typeof SignInResponseSchema>>(
      `${this.baseUrl}/login`,
      payload
    );
  }
}

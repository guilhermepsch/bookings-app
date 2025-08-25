import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  SignInDto,
  SignInResponse,
  JwtPayload,
  JwtPayloadSchema,
} from '@bookings-app/shared-types';
import { AuthApiService } from './api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApi = inject(AuthApiService);

  user = signal<SignInResponse | null>(null);
  error = signal<string | null>(null);
  loading = signal<boolean>(false);

  private readonly TOKEN_KEY = 'auth_token';

  constructor() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const payload = this.decodeToken(token);
      if (payload) {
        this.user.set({ token, payload });
      }
    }
  }

  async login(payload: SignInDto) {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(this.authApi.login(payload));
      const payloadDecoded = this.decodeToken(response.data.token);

      if (!payloadDecoded) {
        throw new Error('Invalid token payload');
      }

      localStorage.setItem(this.TOKEN_KEY, response.data.token);
      this.user.set({ token: response.data.token, payload: payloadDecoded });
    } catch (err: any) {
      this.error.set(err.message || 'Login failed');
      this.user.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.user.set(null);
  }

  get token(): string | null {
    return this.user()?.token ?? null;
  }

  get isLoggedIn(): boolean {
    return this.user() !== null;
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const parsed = JSON.parse(payloadJson);
      return JwtPayloadSchema.parse(parsed);
    } catch {
      return null;
    }
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto, ResponseUserSchema } from '@bookings-app/shared-types';
import {
  GenericResponseOf,
  PaginatedResponseOf,
} from '@bookings-app/shared-types';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/users';

  createUser(payload: CreateUserDto): Observable<GenericResponseOf<typeof ResponseUserSchema>> {
    return this.http.post<GenericResponseOf<typeof ResponseUserSchema>>(this.baseUrl, payload);
  }

  getUsers(): Observable<PaginatedResponseOf<typeof ResponseUserSchema>> {
    return this.http.get<PaginatedResponseOf<typeof ResponseUserSchema>>(this.baseUrl);
  }

  getUserById(id: string): Observable<GenericResponseOf<typeof ResponseUserSchema>> {
    return this.http.get<GenericResponseOf<typeof ResponseUserSchema>>(`${this.baseUrl}/${id}`);
  }

}

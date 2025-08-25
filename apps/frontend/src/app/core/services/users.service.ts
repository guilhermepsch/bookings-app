import { Injectable, inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { CreateUserDto, CreateUserSchema } from '@bookings-app/shared-types';
import { UsersApiService } from './api/users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private api = inject(UsersApiService);

  createUser(dto: CreateUserDto) {
    CreateUserSchema.parse(dto);

    return this.api.createUser(dto).pipe(
      map((res) => res.data), // ✅ unwraps API envelope
      catchError((err) => {
        return throwError(
          () => new Error(err.error?.message ?? 'Failed to create user.')
        );
      })
    );
  }

  getUsers() {
    return this.api.getUsers().pipe(
      map((res) => ({
        users: res.data,
        meta: res.meta,
      }))
    );
  }

  getUserById(id: string) {
    return this.api.getUserById(id).pipe(map((res) => res.data));
  }

}

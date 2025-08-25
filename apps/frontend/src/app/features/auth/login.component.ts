import { Component, inject, signal } from '@angular/core';
import { SignInDto } from '@bookings-app/shared-types';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class LoginComponent {
  private auth = inject(AuthService);

  email = signal('');
  password = signal('');

  login = async (event : SubmitEvent) => {
    event.preventDefault();
    const payload: SignInDto = {
      email: this.email(),
      password: this.password()
    };
    await this.auth.login(payload);
  };

  logout = () => {
    this.auth.logout();
  };

  get isLoading() {
    return this.auth.loading();
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }

  get userEmail() {
    return this.auth.user()?.payload.email;
  }
}

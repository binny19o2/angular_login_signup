import { Component, inject, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  router = inject(Router);
  authService = inject(AuthService);
  async onLogOff() {
    // localStorage.removeItem('logData');
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}

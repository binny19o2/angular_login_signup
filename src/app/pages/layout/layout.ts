import { Component, inject, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  router = inject(Router);

  onLogOff(){
      localStorage.removeItem('logData');
       this.router.navigate(['/login']);
  }
}

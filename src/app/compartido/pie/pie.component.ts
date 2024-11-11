import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent  implements OnInit {
  user: any = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authState$.subscribe((userData) => {
      this.user = userData;
    });
   }

  logout() {
    this.authService.logout();
    this.router.navigate(['/iniciar-sesion']);
  }

}

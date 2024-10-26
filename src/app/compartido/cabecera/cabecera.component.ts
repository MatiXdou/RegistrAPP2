import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent  implements OnInit, OnDestroy {
  usuario: string;
  private authService = inject(AuthService);
  subscriptionsAuthService: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscriptionsAuthService = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  ngOnDestroy() {
    this.subscriptionsAuthService?.unsubscribe();
  }
}

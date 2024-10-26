import { Component, inject, OnInit } from '@angular/core';
import { UsuarioAPI } from 'src/app/models/usuarioAPI.models';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent  implements OnInit {

  usuario: string;
  private authService = inject(AuthService);

  usuarioCompleto: UsuarioAPI;

  constructor() { }

  ngOnInit() {
    this.authService.usuario$.subscribe(usuario => { this.usuario = usuario; });

    this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
      this.usuarioCompleto = usuarioCompleto;
    });
  }

}

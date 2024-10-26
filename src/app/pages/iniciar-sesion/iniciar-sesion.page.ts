import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioAPI } from 'src/app/models/usuarioAPI.models';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  usuario: string = '';
  contra: string = '';
  mensaje: string = '';
  cargando: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private alertController = inject(AlertController);

  estaAutenticado: boolean;
  usuarioCompleto: UsuarioAPI;

  constructor() { }

  ngOnInit(): void {
    this.authService.estaAutenticado$.subscribe(estaAutenticado => this.estaAutenticado = estaAutenticado);
    this.authService.usuarioCompleto$.subscribe(usuarioCompleto => this.usuarioCompleto = usuarioCompleto);
  }

  async inicioSesion(usuario: string, contra: string) {
    this.cargando = true;
    await this.authService.buscarUsuario(usuario, contra);

    if (this.estaAutenticado) {
      this.usuario = '';
      this.contra = '';
      if (this.usuarioCompleto.rol === "docente") {
        this.cargando = false;
        this.mensaje = 'Inicio de sesión exitoso.';
        await this.mostrarMensaje('Éxito', this.mensaje);
        this.router.navigate(['/docente']);
      }
      else{
        this.cargando = false;
        this.mensaje = 'Inicio de sesión exitoso.';
        await this.mostrarMensaje('Éxito', this.mensaje);
        this.router.navigate(['/alumno']);
      }
    } else {
      this.cargando = false;
      this.mensaje = 'usuario o contraseña incorrecto.';
      await this.mostrarMensaje('Error', this.mensaje);
    }

  }

  async mostrarMensaje(cabecera: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: cabecera,
      message: mensaje,
      buttons: ['Entendido']
    });
    await alert.present();
  }

}

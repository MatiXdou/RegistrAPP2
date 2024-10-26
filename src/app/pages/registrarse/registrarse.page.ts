import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  usuario: string = '';
  contra: string = '';
  nombreCompleto: string = '';
  telefono: string = '';
  rol: string = 'alumno';

  cargando: boolean = false;
  mensaje: string = '';

  private authService = inject(AuthService);
  private alertController = inject(AlertController);
  private router = inject(Router);

  async registrar() {
    this.mensaje = '';
    this.cargando = true;
    const existeUsuario = await this.validarUsuario(this.usuario);

    if (existeUsuario) {
      this.cargando = false;
      this.mensaje = 'Nombre de usuario en uso. Elija otro.';
      await this.mostrarMensaje('Error', this.mensaje);
      return;
    }

    const usuarioNuevo = {
      user: this.usuario,
      pass: this.contra,
      name: this.nombreCompleto,
      phone: this.telefono,
      rol: this.rol
    };

    try {
      await this.authService.registrarUsuario(usuarioNuevo);
      this.usuario = '';
      this.contra = '';
      this.nombreCompleto = '';
      this.telefono = '';
      this.rol = 'alumno';
      this.cargando = false;
      this.mensaje = 'Usuario registrado de manera exitosa.';
      await this.mostrarMensaje('Éxito', this.mensaje);
      this.router.navigate(['/iniciar-sesion']);
    } catch (error) {
      this.cargando = false;
      this.mensaje = 'Error al registrar. Inténtalo nuevamente.';
      await this.mostrarMensaje('Error', this.mensaje);
    }
  }

  async validarUsuario(usuario: string): Promise<boolean> {
    try {
      const usuariosExistentes = await this.authService.analizaUsuario();
      return usuariosExistentes.some(u => u.user === usuario);
    } catch (error) {
      this.mensaje = 'Error al validar usuario';
      await this.mostrarMensaje('Error', this.mensaje);
      return true;
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

  constructor() { }

  ngOnInit() { }

}

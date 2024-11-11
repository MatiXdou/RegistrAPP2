import { FirestoreService } from './../../firebase/firestore.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  email: string = '';
  password: string = '';
  cargando: boolean = false;
  error: string = '';
  mensaje: string = '';

  private alertController = inject(AlertController);

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private router: Router) {
  this.error = '';
  }

  ngOnInit() { }

  async login() {
    try {
      this.cargando = true;
      const userCredential = await this.authService.login(this.email, this.password);
      const uid = userCredential.user?.uid;
      const userData = await this.firestoreService.getUser(uid);
      const rol = userData ? userData['rol'] : null;
      this.cargando = false;
      this.email = '';
      this.password = '';
      if (rol === 'docente') {

        this.mensaje = 'Inicio de sesión exitoso.';
        await this.mostrarMensaje('Exito', this.mensaje);
        this.router.navigate(['/docente']);
      } else if (rol === 'alumno') {
        this.mensaje = 'Inicio de sesión exitoso.';
        await this.mostrarMensaje('Exito', this.mensaje);
        this.router.navigate(['/alumno']);
      } else {
        console.log('Rol Desconocido: ', rol);
        this.mensaje = 'No se pudo determinar el rol del usuario.';
        await this.mostrarMensaje('Error', this.mensaje);
      }
    }
    catch (error)
    {
      console.error('Error al iniciar sesión:', error);
      this.error = this.authService.GenError(error);
      this.mensaje = this.error;
      await this.mostrarMensaje('Error', this.mensaje);
      this.cargando = false;
    }
  }


  async loginWithGoogle() {
    try {
      this.cargando = true;
      await this.authService.loginWithGoogle();
      this.cargando = false;

      this.mensaje = 'Inicio de sesión exitoso.';
      await this.mostrarMensaje('Exito', this.mensaje);

      const userData = await this.authService.getCurrentUser();
      if (userData.rol === 'docente') {
        this.router.navigate(['/docente']);
      } else {
        this.router.navigate(['/alumno']);
      }
    } catch (error) {
      this.cargando = false;
      console.error('Error al iniciar sesión con Google:', error);
      this.mensaje = this.authService.GenError(error);
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

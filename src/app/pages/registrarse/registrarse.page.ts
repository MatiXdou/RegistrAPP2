import { FirestoreService } from './../../firebase/firestore.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/firebase/auth.service';
import { User } from 'src/app/models/User.models';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  userData: User = {
    name: '',
    email: '',
    phone: '',
    rol: 'alumno'
  };

  error: string = ''
  password: string = '';
  cargando: boolean = false;
  mensaje: string = '';

  private alertController = inject(AlertController);

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.error = '';
  }

  ngOnInit() { }

  async register() {
    try {
      this.cargando = true;
      const userCredential = await this.authService.register(this.userData.email, this.password);
      const uid = userCredential.user?.uid;
      if(uid) {
        const { name, email, phone, rol } = this.userData;
        await this.firestoreService.createUser(uid, { name, email, phone, rol });
        this.cargando = false;

        this.userData = { name: '', email: '', phone: '', rol: 'alumno' };
        this.password = '';

        this.mensaje = 'Registrado exitosamente.';
        await this.mostrarMensaje('Exito', this.mensaje);

        if (rol === 'docente') {
          this.router.navigate(['/docente']);
        } else if (rol === 'alumno') {
          this.router.navigate(['/alumno']);
        }
      }
    } catch (error) {
      console.error('Error registrando al usuario:', error);
      this.error = this.authService.GenError(error);
      this.mensaje = this.error;
      await this.mostrarMensaje('Error', this.mensaje);
      this.cargando = false;
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

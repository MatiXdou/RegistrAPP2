import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, User, GoogleAuthProvider } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { signInWithPopup } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<any>(null);
  authState$ = this.authStateSubject.asObservable();

  constructor(private afAuth: Auth, private firestoreService: FirestoreService) {
    onAuthStateChanged(this.afAuth, async (user) => {
      if (user) {
        const userData = await this.firestoreService.getUser(user.uid);
        const fullUserData = {
          uid: user.uid,
          email: user.email,
          ...userData,
      };
      this.authStateSubject.next(fullUserData);
      } else {
        this.authStateSubject.next(null);
      }
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.afAuth, provider)
      .then((result) => {
        const user = result.user;
        // Opcional: puedes guardar los datos del usuario en Firestore
        return this.firestoreService.createUser(user.uid, {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          rol: 'alumno' // O el rol que quieras asignar por defecto
        });
      })
      .catch((error) => {
        console.error('Error en login con Google:', error);
        throw error;
      });
  }

  logout() {
    return signOut(this.afAuth);
  }

  getCurrentUser() {
    return this.authStateSubject.value;
  }

  GenError(tipo: any){
    let error: string = '';
    switch (tipo.code) {
      case 'auth/email-already-in-use':
        error = 'El correo electrónico ya está en uso';
        break;
      case 'auth/invalid-email':
        error = 'El correo electrónico no es válido';
        break;
      case 'auth/user-not-found':
        error = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        error = 'Contraseña incorrecta';
        break;
      case 'auth/network-request-failed':
        error = 'Error de red. Verifique su conexión a internet';
        break;
      case 'auth/invalid-credential':
        error = 'Credenciales inválidas';
        break;
      default:
        error = 'Error: ' + tipo.message;
    }
    return error;
  }
}

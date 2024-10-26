import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { redirectIfAuthGuard } from './guard/redirect-if-auth.guard';

const routes: Routes = [
  {
    path: 'alumno',
    loadChildren: () => import('./pages/alumno/alumno.module').then( m => m.AlumnoPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'asistencia/:codigo/:usuario/:fecha',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'cerrar-sesion',
    loadChildren: () => import('./pages/cerrar-sesion/cerrar-sesion.module').then( m => m.CerrarSesionPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'docente',
    loadChildren: () => import('./pages/docente/docente.module').then( m => m.DocentePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./pages/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule),
    canActivate: [redirectIfAuthGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'mostrar-qr/:id/:nombre',
    loadChildren: () => import('./pages/mostrar-qr/mostrar-qr.module').then( m => m.MostrarQrPageModule)
  },
  {
    path: 'pagina-no-encontrada',
    loadChildren: () => import('./pages/no-encontrada/no-encontrada.module').then( m => m.NoEncontradaPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: '',
    redirectTo: 'iniciar-sesion',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pagina-no-encontrada',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

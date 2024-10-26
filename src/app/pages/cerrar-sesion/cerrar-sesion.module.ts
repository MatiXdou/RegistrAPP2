import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CerrarSesionPageRoutingModule } from './cerrar-sesion-routing.module';

import { CerrarSesionPage } from './cerrar-sesion.page';
import { CompartidoModule } from 'src/app/compartido/compartido.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CerrarSesionPageRoutingModule,
    CompartidoModule,
  ],
  declarations: [CerrarSesionPage]
})
export class CerrarSesionPageModule {}

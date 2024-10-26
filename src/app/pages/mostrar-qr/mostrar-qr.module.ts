import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarQrPageRoutingModule } from './mostrar-qr-routing.module';

import { MostrarQrPage } from './mostrar-qr.page';
import { CompartidoModule } from 'src/app/compartido/compartido.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarQrPageRoutingModule,
    CompartidoModule,
  ],
  declarations: [MostrarQrPage]
})
export class MostrarQrPageModule {}

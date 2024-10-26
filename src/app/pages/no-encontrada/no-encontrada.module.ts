import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoEncontradaPageRoutingModule } from './no-encontrada-routing.module';

import { NoEncontradaPage } from './no-encontrada.page';
import { CompartidoModule } from 'src/app/compartido/compartido.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoEncontradaPageRoutingModule,
    CompartidoModule,
  ],
  declarations: [NoEncontradaPage]
})
export class NoEncontradaPageModule {}

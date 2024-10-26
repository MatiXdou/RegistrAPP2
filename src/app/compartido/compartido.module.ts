import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PieComponent } from './pie/pie.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CabeceraComponent,
    PieComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    FormsModule,
  ],
  exports: [
    CabeceraComponent,
    PieComponent,
  ]
})
export class CompartidoModule { }

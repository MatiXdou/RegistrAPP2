import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarQrPage } from './mostrar-qr.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarQrPageRoutingModule {}

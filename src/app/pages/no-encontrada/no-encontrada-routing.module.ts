import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoEncontradaPage } from './no-encontrada.page';

const routes: Routes = [
  {
    path: '',
    component: NoEncontradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoEncontradaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NearCardComponent } from './near-card.component';
const routes: Routes = [
  {
    path: '',
    component: NearCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NearCardRoutingModule {}

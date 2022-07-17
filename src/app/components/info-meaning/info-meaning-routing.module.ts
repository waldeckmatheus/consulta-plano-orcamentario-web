import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoMeaningComponent } from './info-meaning.component';
const routes: Routes = [
  {
    path: '',
    component: InfoMeaningComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoMeaningRoutingModule {}

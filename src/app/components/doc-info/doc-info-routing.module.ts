import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocInfoComponent } from './doc-info.component';
const routes: Routes = [
  {
    path: '',
    component: DocInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocInfoRoutingModule {}

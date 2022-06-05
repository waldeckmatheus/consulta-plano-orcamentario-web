import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DocInfoRoutingModule } from './doc-info-routing.module';
import { DocInfoComponent } from './doc-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocInfoRoutingModule
  ],
  declarations: [DocInfoComponent],
  exports: [DocInfoComponent]
})
export class DocInfoModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { InfoMeaningRoutingModule } from './info-meaning-routing.module';
import { InfoMeaningComponent } from './info-meaning.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoMeaningRoutingModule
  ],
  declarations: [InfoMeaningComponent],
  exports: [InfoMeaningComponent]
})
export class InfoMeaningModule {}
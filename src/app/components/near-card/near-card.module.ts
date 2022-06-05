import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NearCardRoutingModule } from './near-card-routing.module';
import { NearCardComponent } from './near-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NearCardRoutingModule
  ],
  declarations: [NearCardComponent],
  exports: [NearCardComponent]
})
export class NearCardModule {}
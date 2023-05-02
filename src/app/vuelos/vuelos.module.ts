import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VuelosRoutingModule } from './vuelos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VuelosRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class VuelosModule {}

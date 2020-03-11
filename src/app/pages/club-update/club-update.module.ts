import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubUpdatePageRoutingModule } from './club-update-routing.module';

import { ClubUpdatePage } from './club-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubUpdatePageRoutingModule
  ],
  declarations: [ClubUpdatePage]
})
export class ClubUpdatePageModule {}

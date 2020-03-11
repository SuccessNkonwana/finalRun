import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubUpdatePage } from './club-update.page';

const routes: Routes = [
  {
    path: '',
    component: ClubUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubUpdatePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CamerasComponent } from './components/CamerasComponent/Cameras.component';

const routes: Routes = [
  {
    path: '',
    component: CamerasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamerasRoutingModule {}
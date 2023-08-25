import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorComponent } from './components/SensorComponent/Sensor.component';

const routes: Routes = [
  {
    path: ':id',
    component: SensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorRoutingModule {}
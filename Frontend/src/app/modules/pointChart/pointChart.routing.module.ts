import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PointChartComponent } from './components/PointChartComponent/PointChart.component';

const routes: Routes = [
  {
    path: '',
    component: PointChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointChartRoutingModule {}
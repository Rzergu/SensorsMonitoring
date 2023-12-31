import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleChartComponent } from './SimpleChartComponent/SimpleChart.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleChartRoutingModule {}
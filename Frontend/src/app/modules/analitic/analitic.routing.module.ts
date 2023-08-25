import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnaliticComponent } from './components/AnaliticComponent/Analitic.component';

const routes: Routes = [
  {
    path: '',
    component: AnaliticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnaliticRoutingModule {}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateGraphComponent } from './components/StateGraphComponent/StateGraph.component';

const routes: Routes = [
    {
        path: '',
        component: StateGraphComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule {}
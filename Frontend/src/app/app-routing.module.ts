import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/components/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sensors',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/sensors/sensors.module').then(m => m.SensorsModule)
      }
    ]
  },
  {
    path: 'cameras',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/cameras/cameras.module').then(m => m.CamerasModule)
      }
    ]
  },
  {
    path: 'analitic',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/analitic/analitic.module').then(m => m.AnaliticModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
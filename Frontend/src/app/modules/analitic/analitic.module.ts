import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { SharedComponentsModule } from '../../shared/sharedComponents.module'
import { ChartsModule } from 'ng2-charts'
import { AnaliticRoutingModule } from './analitic.routing.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StateModule } from '../state/state.module';
import { AnaliticComponent } from './components/AnaliticComponent/Analitic.component';

@NgModule({
    declarations: [
        AnaliticComponent
    ],
    imports: [
        AnaliticRoutingModule,
    ],
    exports: [
        AnaliticComponent
    ]
})
export class AnaliticModule { }
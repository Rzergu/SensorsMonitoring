import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { SharedComponentsModule } from '../../../shared/sharedComponents.module'
import { ChartsModule } from 'ng2-charts'
import { SimpleChartRoutingModule } from './simplechart.routing.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StateModule } from '../../state/state.module';
import { SimpleChartComponent } from './SimpleChartComponent/SimpleChart.component';

@NgModule({
    declarations: [
        SimpleChartComponent
    ],
    imports: [
        SimpleChartRoutingModule,
    ],
    exports: [
        SimpleChartComponent
    ]
})
export class SimpleChartModule { }
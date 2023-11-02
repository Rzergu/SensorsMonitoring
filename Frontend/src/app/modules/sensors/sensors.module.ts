import { NgModule } from '@angular/core';
import { SensorRoutingModule } from './sensors.routing.module'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { SensorComponent } from './components/SensorComponent/Sensor.component';
import { MatTableModule } from '@angular/material/table';
import { SharedComponentsModule } from '../../shared/sharedComponents.module'
import { StateModule } from '../state/state.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnaliticModule } from '../analitic/analitic.module';
import { SimpleChartModule } from '../simpleChart/components/simplechart.module';
import { PointChartModule } from '../pointChart/pointChart.module';

@NgModule({
    declarations: [
        SensorComponent
    ],
    imports: [
        FlexLayoutModule,
        SensorRoutingModule,
        DragDropModule,
        MatSidenavModule,
        MatTableModule,
        MatListModule,
        MatButtonModule,
        SimpleChartModule,
        PointChartModule,
        AnaliticModule,
        CommonModule,
        SharedComponentsModule,
        MatIconModule,
        StateModule
    ]
})
export class SensorsModule { }
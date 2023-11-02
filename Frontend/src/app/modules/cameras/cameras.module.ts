import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { SharedComponentsModule } from '../../shared/sharedComponents.module'
import { CamerasComponent } from './components/CamerasComponent/Cameras.component';
import { CamerasRoutingModule } from './cameras.routing.module'
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StateModule } from '../state/state.module';

@NgModule({
    declarations: [
        CamerasComponent,
    ],
    imports: [
        FlexLayoutModule,
        DragDropModule,
        MatSidenavModule,
        MatTableModule,
        MatListModule,
        MatGridListModule,
        MatButtonModule,
        CommonModule,
        MatCardModule,
        SharedComponentsModule,
        MatIconModule,
        StateModule
    ]
})
export class CamerasModule { }
import { NgModule } from '@angular/core';
import {StateRoutingModule} from '../state/state.routing.module';
import { StateGraphComponent } from './components/StateGraphComponent/StateGraph.component';
import { from } from 'rxjs';

@NgModule({
    declarations: [
        StateGraphComponent
    ],
    imports: [
        StateRoutingModule
    ],
    exports: [
        StateGraphComponent
    ]
})
export class StateModule { }
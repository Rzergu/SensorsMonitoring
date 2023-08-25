import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { tableViewComponent } from './components/tableView/tableView.component';
import { CdkTableModule } from '@angular/cdk/table'

@NgModule({
    declarations: [
        tableViewComponent
    ],
    imports: [
        MatSidenavModule,
        MatTableModule,
        MatListModule,
        CdkTableModule,
        MatButtonModule,
        CommonModule,
        MatIconModule
    ],
    exports: [tableViewComponent]
})
export class SharedComponentsModule { }
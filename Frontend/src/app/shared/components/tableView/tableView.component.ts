import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
    selector: 'tableView',
    styleUrls: ['tableView.component.css'],
    templateUrl: 'tableView.component.html',
})
export class tableViewComponent {


    @ViewChild(MatPaginator) paginator: MatPaginator;
    columns = [
        { columnDef: 'position', header: 'No.', cell: (element: any) => `${element.position}` },
        { columnDef: 'name', header: 'Name', cell: (element: any) => `${element.name}` },
        { columnDef: 'weight', header: 'Weight', cell: (element: any) => `${element.weight}` },
        { columnDef: 'symbol', header: 'Symbol', cell: (element: any) => `${element.symbol}` },
        { columnDef: 'symbol1', header: 'Symbol1', cell: (element: any) => `${element.symbol}` }
    ];

    displayedColumns = this.columns.map(c => c.columnDef);
    dataSource = new tableViewDataSource();
}

const ELEMENT_DATA: any[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
];


export class tableViewDataSource extends DataSource<any> {

    connect(): Observable<Element[]> {
        return of(ELEMENT_DATA);
    }

    disconnect() { }
}
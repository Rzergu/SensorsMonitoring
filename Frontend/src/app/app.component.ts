import { Component, OnInit } from '@angular/core';
import { SignalRService } from './core/services/signalR/SignalRService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:[
    './app.component.css'
  ]
})
export class AppComponent implements OnInit {
 
  constructor(public signalRService: SignalRService, private http: HttpClient) { }
 
  ngOnInit() {
  }
}

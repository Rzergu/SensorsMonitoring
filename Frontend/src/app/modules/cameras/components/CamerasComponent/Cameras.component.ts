import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SignalRService } from '../../../../core/services/signalR/SignalRService';
import { Camera } from '../../../../core/entity/Camera';
import { StatesModel } from '../../../../core/entity/StatesModel';
import { CamerasRepositoryService } from '../../../../core/services/camera/camera.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './Cameras.component.html',
  styleUrls: ['./Cameras.component.css']
})
export class CamerasComponent implements OnInit, AfterViewInit {
  cameras: Camera[];
  public data: StatesModel[];

  constructor(public signalRService: SignalRService, private camerasService: CamerasRepositoryService, private router: Router) {
    this.signalRService = signalRService;
    this.camerasService = camerasService;
    this.cameras = [];
    this.data = [{ name: "test1", states: [{ date: new Date(2020, 3, 1, 14, 14, 14), value: 1 }, { date: new Date(2020, 3, 1, 14, 15, 14), value: 2 }] },
    { name: "test2", states: [{ date: new Date(2020, 3, 1, 16, 14, 14), value: 5 }, { date: new Date(2020, 3, 1, 16, 15, 14), value: 6 }] }]
  }
  displayedColumns: string[] = ['id', 'name'];

  ngOnInit() {
    this.camerasService.GetCameras().subscribe(data => {
      this.cameras = data
    });
  }
  ngAfterViewInit() {
  }
  navigateToCameraDetail(camerasId) {
    this.router.navigate(['/cameras', camerasId]);
  }
}
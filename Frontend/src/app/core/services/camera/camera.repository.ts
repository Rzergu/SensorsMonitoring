import { Injectable,OnInit } from '@angular/core';
import { Camera } from '../../entity/Camera';
import {HttpClient} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';

@Injectable({ providedIn: 'root',})
export class CamerasRepositoryService {
  private _cameras: Observable<Camera[]>;
  private camerasDatabase: CamerasHttpDatabase | null;

  constructor(private _httpClient: HttpClient) {
    this._cameras = null;
    this.camerasDatabase = new CamerasHttpDatabase(this._httpClient);
    this._cameras = this.camerasDatabase.getThings();
  }

  public GetCameras(){
    return this._cameras;
  }
  public GetCamera(id){
    return this.camerasDatabase.getThing(id);
  }
}

export class CamerasHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getThings(): Observable<Camera[]> {
    const href = 'http://192.168.0.106:53294/Cameras';
    const requestUrl =
        `${href}`;

    return this._httpClient.get<Camera[]>(requestUrl);
  }
  getThing(id): Observable<Camera> {
    const href = 'http://192.168.0.106:53294/cameras/' + id;
    const requestUrl =
        `${href}`;
    return this._httpClient.get<Camera>(requestUrl);
  }
}
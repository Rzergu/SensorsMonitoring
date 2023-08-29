import { Injectable,OnInit } from '@angular/core';
import { Sensor } from '../../entity/Sensor';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';

@Injectable({ providedIn: 'root',})
export class SensorsRepositoryService {
  private _sensors: Observable<Sensor[]>;
  private sensorsDatabase: SensorsHttpDatabase | null;

  constructor(private _httpClient: HttpClient) {
    this._sensors = null;
    this.sensorsDatabase = new SensorsHttpDatabase(this._httpClient);
    this._sensors = this.sensorsDatabase.getSensors();
  }
  public GetSensor(id){
    return this.sensorsDatabase.getSensor(id);
  }
  public SetSensorValue(value){
    return this.sensorsDatabase.setSensorValue(value);
  }
  public GetSensors(){
    return this._sensors;
  }
}

export class SensorsHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getSensor(id): Observable<Sensor> {
    const href = 'http://192.168.0.106:53294/sensors/'+id;
    const requestUrl =
        `${href}`;

    return this._httpClient.get<Sensor>(requestUrl);
  }
  setSensorValue(value): Observable<boolean>  {
    const href = 'http://192.168.0.106:53294/sensors/Set';
    const requestUrl =
        `${href}`;
    var json = JSON.stringify(value)
    const headerDict = {
      'Content-Type': 'application/json'
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this._httpClient.post<boolean>(requestUrl, json, requestOptions);
  }
  getSensors(): Observable<Sensor[]> {
    const href = 'http://192.168.0.106:53294/sensors';
    const requestUrl =
        `${href}`;

    return this._httpClient.get<Sensor[]>(requestUrl);
  }
}
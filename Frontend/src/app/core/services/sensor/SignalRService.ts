import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Sensor } from '../../entity/Sensor';
import {HttpClient} from '@angular/common/http';
import { User } from '../../entity/User';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: Sensor[];
  private token: string;
  private hubConnection: signalR.HubConnection
  constructor(private _httpClient: HttpClient) {
    this.getToken().then((value) => {
      this.token = value
      this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://192.168.0.106:53294/chart', { accessTokenFactory: () => this.token }).build();
      this.hubConnection.start()
    });
 
  }
  public async startConnection() {
    this.token = await this.getToken();
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://192.168.0.106:53294/chart', { accessTokenFactory: () => this.token }).build();
    await this.hubConnection.start()
  }
  private async getToken()
  {
    const href = 'http://192.168.0.106:53294/token';
    const requestUrl =
        `${href}?username=admin@gmail.com&password=12345`;
    var user =  await this._httpClient.post<User>(requestUrl, '').toPromise()
    return user.access_token;
  }

  public async addTransferChartDataListener(sensorId,listener) {
    if (!this.hubConnection || this.hubConnection.state == signalR.HubConnectionState.Disconnected) {
      await this.startConnection()
    }
    this.hubConnection.invoke('JoinGroup', sensorId);
    this.hubConnection.on('transferfreqdata', listener);
  }
  public async addAverageChartDataListener(sensorId,listener) {
    if (!this.hubConnection || this.hubConnection.state == signalR.HubConnectionState.Disconnected) {
      await this.startConnection()
    }
    this.hubConnection.invoke('JoinGroup', sensorId);
    this.hubConnection.on('transferaveragedata', listener);
  }
}
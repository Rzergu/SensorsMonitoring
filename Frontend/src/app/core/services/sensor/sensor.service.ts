import { Injectable,OnInit } from '@angular/core';
import { Sensor } from '../../entity/Sensor';
import { EventEmitter } from '@angular/core'
import { FrequencyModel } from 'src/app/core/entity/FrequencyModel';

import {merge, Observable, of as observableOf} from 'rxjs';

@Injectable({ providedIn: 'root',})
export class SensorsService {
  private sensorsMap = new Map<number, EventEmitter<FrequencyModel[]>>()
  constructor()
  {
    
  }
  public RegisterSensor(id)
  {
    this.sensorsMap.set(id, new EventEmitter<FrequencyModel[]>())
  }
  public SubscribeToSensor(id, callback)
  {
    this.sensorsMap.get(1).subscribe(callback)
  }
  public SetCurrentValueSensor(id, value)
  {
    this.sensorsMap.get(id).emit(value)
  }
}

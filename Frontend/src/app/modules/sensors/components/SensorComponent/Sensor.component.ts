import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SignalRService } from '../../../../core/services/signalR/SignalRService';
import { SensorsRepositoryService } from '../../../../core/services/sensor/sensor.repository';
import { Router, ActivatedRoute  } from '@angular/router';
import { SensorsService } from 'src/app/core/services/sensor/sensor.service';
import { FrequencyModel } from '../../../../core/entity/FrequencyModel'
import { Sensor } from '../../../../core/entity/Sensor';
import { TimeValueModel } from '../../../../core/entity/TimeValueModel';

@Component({
  selector: 'app-root',
  templateUrl: './Sensor.component.html',
  styleUrls: ['./Sensor.component.css']
})
export class SensorComponent implements OnInit, AfterViewInit {
  public sensor: Sensor;
  public data: FrequencyModel[];
  public dataAlg: TimeValueModel[];
  private currentValue:FrequencyModel[];
  constructor(public signalRService: SignalRService, 
              private sensorsRepository: SensorsRepositoryService,
              public sensorService: SensorsService,
              private router: Router, 
              private route: ActivatedRoute) 
  {
    this.sensorService = sensorService;
    this.signalRService = signalRService;
    this.sensorsRepository = sensorsRepository;
    this.sensor = new Sensor();
    this.data = [{frequency : 1000, power : 20}, {frequency : 2000, power : 30}, {frequency : 3000, power: 500}]
    this.dataAlg = [{date : new Date("2019-01-16"), value : 1},{date : new Date("2019-01-17"), value : 2}]
  }
  displayedColumns: string[] = ['id', 'name'];

  private updateData(value:FrequencyModel[])
  {
    this.currentValue = value
  }
  setAsNormal()
  {
    this.sensorsRepository.SetSensorValue(this.currentValue).subscribe(data => {
      var a = data
    }, err => {
      var b = err
    })
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sensorService.RegisterSensor(Number(params.get('id')));
      this.sensorsRepository.GetSensor(params.get('id')).subscribe(data => {
        this.sensor = data
        this.sensorService.SubscribeToSensor(this.sensor.id, this.updateData.bind(this))
      });
      this.signalRService.addTransferChartDataListener(params.get('id'), (newData) => {
        debugger
        this.sensor.sensorValues.push(newData)
      });
      this.signalRService.addAverageChartDataListener(params.get('id'), (newData) => {
        this.sensor.averageValues.push(newData)
        var tmpSens = new Sensor()
        tmpSens.id = this.sensor.id
        tmpSens.name = this.sensor.name
        tmpSens.sensorValues = this.sensor.sensorValues
        tmpSens.averageValues = this.sensor.averageValues
        this.sensor = tmpSens
      });
    }); 
  }
  ngAfterViewInit() {

  }
}
import { HostListener, Directive,SimpleChanges, Component, OnInit, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { Sensor } from 'src/app/core/entity/Sensor';
import { SensorDataModel } from 'src/app/core/entity/SensorDataModel';
import { SensorsService } from 'src/app/core/services/sensor/sensor.service';
import { FrequencyModel } from 'src/app/core/entity/FrequencyModel';
import {formatDate} from '@angular/common';
@Component({
  selector: 'analitic-graph',
  templateUrl: './Analitic.component.html',
  styleUrls: ['./Analitic.component.css']
})
export class AnaliticComponent implements OnInit, OnChanges {
  @Input() transitionTime = 1000;
  @Input() hticks = 60;
  @Input() data: Sensor;
  @Input() showLabel = 1;
  hostElement; // Native element hosting the SVG container
  svg; // Top level SVG element
  g; // SVG Group element
  colorScale; // D3 color provider
  xAxis;
  yAxis;
  zAxis;
  brush;
  xAxisNet;
  idleTimeout;
  extent;
  startIndex;
  endIndex;
  line;
  clipped;
  maxZ;
  data_area;
  yAxisLegend;
  clip;
  legendScale;
  zoom;
  yAxisNet;
  zAxisNet;
  x; // X-axis graphical coordinates
  y; // Y-axis graphical coordinates
  z;
  overlap = 16;
  drag;
  dates;
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  bins; // Array of frequency distributions - one for each area chaer
  paths; // Path elements for each area chart
  areaGenerator;
  area; // For D3 area function
  histogram; // For D3 histogram function

  constructor(private elRef: ElementRef, public sensorService: SensorsService) {
      this.hostElement = this.elRef.nativeElement;
      this.sensorService = sensorService;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.data && !changes.data.firstChange) {
          this.data = changes.data.currentValue
          this.createChart();
      }
  }

  private createChart() {
      this.removeExistingChartFromParent();
      this.dates = this.data.sensorValues.map(x => new Date(x.date))
      this.startIndex = 0;
      this.endIndex = 39;
      this.dates = this.dates.sort((n1,n2) => {
        if (n1 > n2) {
            return 1;
        }
        if (n1 < n2) {
            return -1;
        }
        return 0;
      })
      
      this.data.sensorValues.forEach(element => {
        let tmp = []
        element.sensorsFrequencyDataItems = element.sensorsFrequencyDataItems.concat(tmp).sort((n1,n2) => {
            if (n1.frequency > n2.frequency) {
                return 1;
            }
            if (n1.frequency < n2.frequency) {
                return -1;
            }
            return 0;
          });
      });
      this.data.sensorValues = this.data.sensorValues.sort((n1,n2) => {
        if (n1.date < n2.date) {
            return 1;
        }
        if (n1.date > n2.date) {
            return -1;
        }
        return 0;
      })
      if((this.dates.length/60) < 1)
      {
          var count = 60 - this.dates.length
          var minDate = this.dates[0]
          for(var i = 0; i < count; i++)
          {
            var sensDataModel = new SensorDataModel()
            sensDataModel.date = new Date(minDate.setHours(minDate.getHours() + i))
            sensDataModel.sensorsFrequencyDataItems = [];
            this.data.sensorValues.push(sensDataModel)
          }
      }

      this.setChartDimensions();

      this.addGraphicsElement();

      this.createXAxis();

      this.createYAxis();
      this.createZ();

      this.areaGenerator = d3.area()
          .x((datum: any) => this.x(datum.frequency))
          .y0(270)
          .y1((datum: any) => this.z(datum.power));
      this.line = this.areaGenerator.lineY1();
      this.createAreaCharts();
      this.setZoom();
      this.setColorScale();
      //this.setBrushTool();

  }
  private setColorScale()
  {
    this.g.append("linearGradient")
    .attr("id", "line-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", this.z(0))
    .attr("x2", 0)
    .attr("y2", this.z(this.maxZ))
    .selectAll("stop")
      .data([
        {offset: "0%", color: "grey"},
        {offset: "100%", color: "red"}
      ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

  }
  private setZoom()
  {
    this.zoom = d3.zoom()
    .scaleExtent([-Infinity, Infinity])
    .extent([[70, 0], [540, 270]])
    .translateExtent([[70, -Infinity], [540, Infinity]])
    .on("zoom", this.zoomed.bind(this));
    this.svg.call(this.zoom)
    .transition()
      .duration(750)
      .call(this.zoom.scaleTo, 4, [this.y('2005-08-09T18:31:42'), 0]);
  }
  private zoomed() {
    if(d3.event && d3.event.sourceEvent && d3.event.sourceEvent.type == 'wheel')
    {   
        var direction = d3.event.sourceEvent.wheelDelta < 0 ? 'down' : 'up';
        
        if(direction == 'up')
        {   
                if(this.startIndex > 0)
                {
                    this.startIndex--;
                    this.endIndex--;
                    this.y = d3.scalePoint().domain(this.data.sensorValues.slice(this.startIndex, this.endIndex).map(x => formatDate(x.date, 'yyyy-MM-dd HH:mm:ss', 'en-US'))).range([270, 0])
                
                }     
        }
        else
        {
                if(this.endIndex < this.data.sensorValues.length)
                {
                    this.startIndex++;
                    this.endIndex++;
                    this.y = d3.scalePoint().domain(this.data.sensorValues.slice(this.startIndex, this.endIndex).map(x => formatDate(x.date, 'yyyy-MM-dd HH:mm:ss', 'en-US'))).range([270, 0])
                }
        }
        var current = this.data.sensorValues.slice(this.startIndex, this.endIndex)[0]
        this.sensorService.SetCurrentValueSensor(this.data.id, current.sensorsFrequencyDataItems)
        this.yAxis.transition().duration(this.transitionTime).call(d3.axisLeft(this.y).tickSize(0).tickFormat(<any>''));
        this.yAxisNet.transition().duration(this.transitionTime).call(d3.axisLeft(this.y).ticks(5).tickSize(-500));
        this.createAreaCharts();
    }
  }
  private setChartDimensions() {
      let viewBoxHeight = 300;
      let viewBoxWidth = 750;
      this.svg = d3.select(this.hostElement).append('svg')
          .attr('width', '100%')
          .attr('height', '100%')
          .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
  }

  private addGraphicsElement() {
      this.g = this.svg.append("g")
          .attr("transform", "translate(0,0)");
          
  }


  private createXAxis() {
      this.x = d3.scaleLinear()
          .domain([0, d3.max(this.data.sensorValues, sensorValues => d3.max(sensorValues.sensorsFrequencyDataItems, dataPoint => dataPoint.frequency))])
          .range([70, 580]);

      this.xAxis =this.g.append('g')
          .attr('transform', 'translate(0,270)')
          .attr("stroke-width", 0.5)

      this.xAxis.call(d3.axisBottom(this.x).tickSize(0).tickFormat(<any>''));

      this.xAxisNet = this.g.append('g')
          .attr('transform', 'translate(0,270)')
          .style('font-size', '6')
          .style("stroke-dasharray", ("1,1"))
          .attr("stroke-width", 0.1)

      this.xAxisNet.call(d3.axisBottom(this.x));


  }

  private createZ() {
      this.maxZ = d3.max(this.data.sensorValues, sensorValues => d3.max(sensorValues.sensorsFrequencyDataItems, dataPoint => dataPoint.power));
      this.z = d3.scaleLinear()
          .domain([0, this.maxZ])
          .range([270, 135]);
  }

    private createYAxis() {
      this.y = d3.scalePoint()
          .domain(this.data.sensorValues.slice(this.startIndex, this.endIndex).map(date => formatDate(date.date, 'yyyy-MM-dd HH:mm:ss', 'en-US')))
          .range([270, 0]);
        

      this.yAxis = this.g.append('g')
          .attr('transform', 'translate(70,0)')
          .attr("stroke-width", 0.5)

      this.yAxis.call(d3.axisLeft(this.y).tickSize(0).tickFormat(<any>''));
      
      this.yAxisNet = this.g.append('g')
          .attr('transform', 'translate(70,0)')
          .style("stroke-dasharray", ("1,1"))
          .attr("stroke-width", 0.1)

      this.yAxisNet.call(d3.axisLeft(this.y).ticks(-5).tickSize(-600))
          .style('font-size', '6');

  }
  
  private createAreaCharts() {
    if(this.paths)
    {
        this.paths.forEach(element => {
            element.remove()
        });
    }
    this.legendScale = d3.scaleLinear()
    .domain([0, this.maxZ])
    .range([270, 0]);
    this.yAxisLegend = this.g.append('g')
    .attr('transform', 'translate(720,0)')
    .attr("stroke-width", 0.5)

    this.yAxisLegend.call(d3.axisLeft(this.legendScale));

    this.g.append("rect")
    .attr("width", 10)
    .attr("height", 270)
    .attr("transform", 'translate(725,0)')
    .style("fill", "url(#line-gradient)");
    this.paths = [];
    this.data.sensorValues.slice(this.startIndex, this.endIndex).reverse().forEach((element,index) => {

        this.paths.push(this.g.append('path')
        .attr('fill', "none")
        .attr("stroke-width", 1)
        .attr("stroke", "url(#line-gradient)" )
        .attr("transform", (d, i) => `translate(${-(index*2)+79},${this.y(formatDate(element.date, 'yyyy-MM-dd HH:mm:ss', 'en-US'))-270})`)
        .attr("d", this.line(element.sensorsFrequencyDataItems))
        .attr("clip-path", "url(#clip)")
        );
        this.paths.push(this.g.append('path')
        .attr('fill', "url(#line-gradient)")
        .attr("stroke-width", 1)
        .attr("transform", (d, i) => `translate(${-(index*2)+79},${this.y(formatDate(element.date, 'yyyy-MM-dd HH:mm:ss', 'en-US'))-270})`)
        .attr("d", this.areaGenerator(element.sensorsFrequencyDataItems))
        .attr("clip-path", "url(#clip)"));
    });
    var current = this.data.sensorValues.slice(this.startIndex, this.endIndex)[0]
    this.sensorService.SetCurrentValueSensor(this.data.id, current.sensorsFrequencyDataItems)
  }
  public updateChart() {
      if (!this.svg) {
          this.createChart();
          return;
      }

      this.x = d3.scaleLinear()
          .domain([0, d3.max(this.data.sensorValues, sensorValues => d3.max(sensorValues.sensorsFrequencyDataItems, dataPoint => dataPoint.frequency))])
          .range([70, 580]);
      this.xAxis.transition().duration(this.transitionTime).call(d3.axisBottom(this.x).tickSize(0).tickFormat(<any>''));
      this.xAxisNet.transition().duration(this.transitionTime).call(d3.axisBottom(this.x).ticks(10).tickSize(-260));

      this.y = d3.scalePoint()
          .domain(this.data.sensorValues.slice(this.startIndex, this.endIndex).map(date => formatDate(date.date, 'yyyy-MM-dd HH:mm:ss', 'en-US')))
          .range([270, 0]);
      this.yAxis.transition().duration(this.transitionTime).call(d3.axisLeft(this.y).tickSize(0).tickFormat(<any>''));
      this.yAxisNet.transition().duration(this.transitionTime).call(d3.axisLeft(this.y).ticks(-5).tickSize(-500))
      .style('font-size', '6');

      this.maxZ = d3.max(this.data.sensorValues, sensorValues => d3.max(sensorValues.sensorsFrequencyDataItems, dataPoint => dataPoint.power));
      this.z = d3.scaleLinear()
          .domain([0, this.maxZ])
          .range([270, 135]);
      this.createAreaCharts();
  }

  private updateAreaCharts() {
      this.paths.forEach((path,index) => {
          path.datum(this.data.sensorValues.slice(this.startIndex, this.endIndex)[index])
              .transition().duration(this.transitionTime)
              .attr("clip-path", "url(#clip)")
              .attr('d', d3.area()
                  .x((datum: any) => this.x(datum.frequency))
                  .y0(0)
                  .y1((datum: any) => this.x(datum.power)));
      });
  }

  private removeExistingChartFromParent() {
      d3.select(this.hostElement).select('svg').remove();
  }
}

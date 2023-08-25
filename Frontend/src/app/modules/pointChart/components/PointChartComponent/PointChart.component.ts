import { HostListener, Directive,SimpleChanges, Component, OnInit, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TimeValueModel } from '../../../../core/entity/TimeValueModel'
import {formatDate} from '@angular/common';
import * as d3 from 'd3';
import { Sensor } from 'src/app/core/entity/Sensor';

@Component({
  selector: 'point-chart',
  templateUrl: './PointChart.component.html',
  styleUrls: ['./PointChart.component.css']
})
export class PointChartComponent implements OnInit,OnChanges {
  @Input() transitionTime = 1000;
  @Input() hticks = 60;
  @Input() data: Sensor;
  @Input() sensorId: number;
  @Input() showLabel = 1;
  hostElement; // Native element hosting the SVG container
  svg; // Top level SVG element
  g; // SVG Group element
  colorScale; // D3 color provider
  xAxis;
  yAxis;
  brush;
  xAxisNet;
  idleTimeout;
  extent;
  clip;
  yAxisNet;
  areaGenerator;
  x; // X-axis graphical coordinates
  y; // Y-axis graphical coordinates
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  bins; // Array of frequency distributions - one for each area chaer
  paths; // Path elements for each area chart
  area; // For D3 area function
  histogram; // For D3 histogram function

  constructor(private elRef: ElementRef) {
      this.hostElement = this.elRef.nativeElement;
      this.data = this.data;  
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && !changes.data.firstChange) {
            this.data = changes.data.currentValue
            this.updateChart();
        }
    }
  ngOnInit() {
  }

  private createChart() {

      this.removeExistingChartFromParent();

      this.setChartDimensions();

      this.addGraphicsElement();

      this.createXAxis();

      this.createYAxis();

      this.areaGenerator = d3.area()
          .x((datum: any) => this.x(formatDate(datum.date, 'yyyy-MM-dd HH:mm:ss', 'en-US')))
          .y0(this.y(0))
          .y1((datum: any) => this.y(datum.value));
      this.createAreaCharts();
      this.setBrushTool();

  }
  private setBrushTool(){
    this.clip = this.svg.append("defs").append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr('transform', 'translate(30,0)')
    .attr("width", 550 )
    .attr("height", 280 )
    this.area = this.svg.append('g')
    .attr("clip-path", "url(#clip)")
    this.brush = d3.brushX()                   // Add the brush feature using the d3.brush function
    .extent( [ [0,0], [580,280] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("end", this.zoomChart.bind(this))
    this.area
    .append("g")
      .attr("class", "brush")
      .call(this.brush);
    
    this.svg.on("dblclick",function(){
        this.x.domain(d3.extent(this.data, function(d:any) { return d.data; }))
        this.xAxis.transition().call(d3.axisBottom(this.x))
        this.area
            .select('.myArea')
            .transition()
            .attr("d", this.areaGenerator(this.data.averageValues))
        });
  }
  private setChartDimensions() {
      let viewBoxHeight = 300;
      let viewBoxWidth = 600;
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
      this.x = d3.scalePoint()
          .domain(this.data.averageValues.map(data => formatDate(data.date, 'yyyy-MM-dd HH:mm:ss', 'en-US')))
          .range([30, 580]);

      this.xAxis =this.g.append('g')
          .attr('transform', 'translate(0,270)')
          .attr("stroke-width", 0.5)

      this.xAxis.call(d3.axisBottom(this.x).tickSize(0).tickFormat(<any>''));

      this.xAxisNet = this.g.append('g')
          .attr('transform', 'translate(0,270)')
          .style('font-size', '6')
          .style("stroke-dasharray", ("1,1"))
          .attr("stroke-width", 0.1)

      //this.xAxisNet.call(d3.axisBottom(this.x).ticks(10).tickSize(-260));

  }

  private createYAxis() {
      this.y = d3.scaleLinear()
          .domain([0, d3.max(this.data.averageValues, dataPoint => dataPoint.value)])
          .range([270, 10]);

      this.yAxis = this.g.append('g')
          .attr('transform', 'translate(30,0)')
          .attr("stroke-width", 0.5)

      this.yAxis.call(d3.axisLeft(this.y).tickSize(0).tickFormat(<any>''));
      
      this.yAxisNet = this.g.append('g')
          .attr('transform', 'translate(30,0)')
          .style("stroke-dasharray", ("1,1"))
          .attr("stroke-width", 0.1)

      this.yAxisNet.call(d3.axisLeft(this.y).ticks(4).tickSize(-550))
          .style('font-size', '6');

      if (this.showLabel === 1) {
          this.g.append('text')
          .attr('text-anchor', 'middle')
          .attr('transform', 'translate(10,135) rotate(-90)')
          .style('font-size', 14)
          .attr('fill', "white")
          .text('Отклонение');
      }
  }
  private createAreaCharts() {
    this.paths = [];
    this.paths.push(this.g.append('path')
    .attr('fill', "steelblue")
    .attr("stroke-width", 3)
    .attr('opacity', 0.9)
    .attr("clip-path", "url(#clip)")
    .attr('d', this.areaGenerator(this.data.averageValues))
    );

  }
  private zoomChart() {
      this.extent = d3.event.selection

      if(this.extent){
        this.x = d3.scaleLinear().domain([ this.x.invert(this.extent[0]), this.x.invert(this.extent[1]) ]).range([30, 580])
        this.area.select(".brush").call(this.brush.move, null)
      }
      this.xAxis.transition().duration(this.transitionTime).call(d3.axisBottom(this.x).tickSize(0).tickFormat(<any>''));
      this.xAxisNet.transition().duration(this.transitionTime).call(d3.axisBottom(this.x).ticks(10).tickSize(-260));

      this.updateAreaCharts();
  }
  public updateChart() {
      if (!this.svg) {
          this.createChart();
          return;
      }

      this.x = d3.scalePoint()
        .domain(this.data.averageValues.map(data => formatDate(data.date, 'yyyy-MM-dd HH:mm:ss', 'en-US')))
        .range([30, 580]);
      this.xAxis.transition().duration(this.transitionTime).call(d3.axisBottom(this.x).tickSize(0).tickFormat(<any>''));
      //this.xAxisNet.transition().duration(this.transitionTime).call(d3.axisBottom(this.x).ticks(10).tickSize(-260));

      this.y = d3.scaleLinear()
      .domain([0, d3.max(this.data.averageValues, dataPoint => dataPoint.value)])
      .range([270, 10]);
      this.yAxis.transition().duration(this.transitionTime).call(d3.axisLeft(this.y).tickSize(0).tickFormat(<any>''));
      this.yAxisNet.transition().duration(this.transitionTime).call(d3.axisLeft(this.y).ticks(4).tickSize(-550))
      .style('font-size', '6');

      this.updateAreaCharts();
  }

  private updateAreaCharts() {
      this.paths.forEach((path) => {
          path.datum(this.data.averageValues)
              .transition().duration(this.transitionTime)
              .attr("clip-path", "url(#clip)")
              .attr('d', d3.area()
                  .x((datum: any) => this.x(formatDate(datum.date, 'yyyy-MM-dd HH:mm:ss', 'en-US')))
                  .y0(this.y(0))
                  .y1((datum: any) => this.y(datum.value)));
      });
  }

  private removeExistingChartFromParent() {
      d3.select(this.hostElement).select('svg').remove();
  }
}

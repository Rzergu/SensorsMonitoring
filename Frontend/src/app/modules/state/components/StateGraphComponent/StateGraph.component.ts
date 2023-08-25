import { HostListener, Directive, Component, OnInit, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StatesModel } from '../../../../core/entity/StatesModel';
import * as d3 from 'd3';
const data1 = [
  {
    year: 2000,
    popularity: 50
  },
  {
    year: 2001,
    popularity: 150
  },
  {
    year: 2002,
    popularity: 200
  },
  {
    year: 2003,
    popularity: 130
  },
  {
    year: 2004,
    popularity: 240
  },
  {
    year: 2005,
    popularity: 380
  },
  {
    year: 2006,
    popularity: 420
  }
];
@Component({
  selector: 'state-graph',
  templateUrl: './StateGraph.component.html',
  styleUrls: ['./StateGraph.component.css']
})
export class StateGraphComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input('data') data: StatesModel[];


  svg: any;
  margin = { top: 20, right: 20, bottom: 50, left: 30 };
  g: any;
  width: number;
  height: number;
  x;
  y;
  z;
  line;
  constructor(private el: ElementRef) {

  }
  ngOnInit() {

  }
  ngOnChanges(): void {
    if (!this.data) { return; }
  }
  ngAfterViewInit() {
    this.createChart();
  }
  private createChart(): any {
    const heightValue = 300;
    const widthValue = 600;

    // Create SVG and padding for the chart
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("viewBox", `0 0 ${widthValue} ${heightValue}`)
      ;

    const strokeWidth = 1.5;
    const margin = { top: 0, bottom: 20, left: 30, right: 20 };
    const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
    const width = 600 - margin.left - margin.right - (strokeWidth * 2);
    const height = 300 - margin.top - margin.bottom;
    const grp = chart
      .append("g")
      .attr("transform", `translate(-${margin.left - strokeWidth},-${margin.top})`);

    // Create scales
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data1, dataPoint => dataPoint.popularity)]);
    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain(d3.extent(data1, dataPoint => dataPoint.year));

    const area = d3
      .area<any>()
      .x(dataPoint => xScale(dataPoint.year))
      .y0(height)
      .y1(dataPoint => yScale(dataPoint.popularity));

    // Add area
    grp
      .append("path")
      .attr("transform", `translate(${margin.left},0)`)
      .datum(data1)
      .style("fill", "lightblue")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", strokeWidth)
      .attr("d", area);

    // Add the X Axis
    chart
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(data1.length));

    // Add the Y Axis
    chart
      .append("g")
      .attr("transform", `translate(0, 0)`)
      .call(d3.axisLeft(yScale));
  }
}

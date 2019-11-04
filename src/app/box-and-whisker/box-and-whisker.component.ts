import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from "d3";
import * as $ from "jquery";
@Component({
  selector: 'app-box-and-whisker',
  templateUrl: './box-and-whisker.component.html',
  styleUrls: ['./box-and-whisker.component.css']
})
export class BoxAndWhiskerComponent implements OnInit {
  @ViewChild('boxAndWhiskerChart',{static:true}) private chartContainer: ElementRef;
  @Input() private data: IFEObj[];
  @Input() private unit:any

  constructor(private hostRef: ElementRef) {
  }

  ngOnInit() {
    if(this.data){
      this.createChart();
    }
  }

  createChart() {

    let el = this.chartContainer.nativeElement;
    let divWidth = $(this.hostRef.nativeElement).parent().width();
    d3.select(el).selectAll("*").remove();

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = divWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(el)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + 50)
      .append("g")
      .attr("transform",
        "translate(" + (margin.left + 20) + "," + margin.top + ")");


    let boxChartData = []
    /**
     * This local variable keeps the x-axis lebels
     */
    let keyList = []
    this.data.forEach((data, key) => {
      let quantitileRange = 1
      keyList.push("Date" + data.day)
      boxChartData.push({
        key: "Date" + data.day, value:
          { interQuantileRange: quantitileRange, max: data.max, median: data.median, min: data.min, q1: data.quartile1, q3: data.quartile3 }
      })
    });

    // Show the X scale
    var x = d3.scaleBand()
      .range([0, width])
      .domain(keyList)
      .paddingInner(10)
      .paddingOuter(.5)
    let xLevels = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))


    xLevels.selectAll("text")
    .call(this.wrap)
    xLevels.append("text")             // text label for the x axis
      .attr("x", (width / 2))
      .attr("y", 40)
      .attr("dy", "1.71em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#000")
      .text(this.unit[1])


    // Show the Y scale
    var y = d3.scaleLinear()

      .range([height, 0])
    y.domain([0, d3.max(boxChartData, function (d) {
      return d['value'].max;
    })]);
    svg.append("g").call(d3.axisLeft(y))
      .append("text") // and text1
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("x", -150)
      .attr("dy", "-2.71em")
      .style("text-anchor", "end")
      .style("font-size", "14px")
      .style("fill", "#000")
      .text(this.unit[0]);
    // Show the main vertical line
    svg
      .selectAll("vertLines")
      .data(boxChartData)
      .enter()
      .append("line")
      .attr("x1", function (d) { return (x(d.key)) })
      .attr("x2", function (d) { return (x(d.key)) })
      .attr("y1", function (d) { return (y(d.value.min)) })
      .attr("y2", function (d) { return (y(d.value.max)) })
      .attr("stroke", "black")
      .attr("stroke-dasharray", "5,5")
      .style("width", 40)

    // rectangle for the main box
    var boxWidth = 30
    svg
      .selectAll("boxes")
      .data(boxChartData)
      .enter()
      .append("rect")
      .attr("x", function (d) { return (x(d.key) - boxWidth / 2) })
      .attr("y", function (d) { return (y(d.value.q3)) })
      .attr("height", function (d) { return (y(d.value.q1) - y(d.value.q3)) })
      .attr("width", boxWidth)
      .attr("stroke", "black")
      .style("fill", "#ffffff")

    // Show the median
    svg
      .selectAll("medianLines")
      .data(boxChartData)
      .enter()
      .append("line")
      .attr("x1", function (d) { return (x(d.key) - boxWidth / 2) })
      .attr("x2", function (d) { return (x(d.key) + boxWidth / 2) })
      .attr("y1", function (d) { return (y(d.value.min)) })
      .attr("y2", function (d) { return (y(d.value.min)) })
      .attr("stroke", "black")
      .style("width", 80)
    svg
      .selectAll("medianLines")
      .data(boxChartData)
      .enter()
      .append("line")
      .attr("x1", function (d) { return (x(d.key) - boxWidth / 2) })
      .attr("x2", function (d) { return (x(d.key) + boxWidth / 2) })
      .attr("y1", function (d) { return (y(d.value.median)) })
      .attr("y2", function (d) { return (y(d.value.median)) })
      .attr("stroke", "black")
      .style("width", 80)
    svg
      .selectAll("medianLines")
      .data(boxChartData)
      .enter()
      .append("line")
      .attr("x1", function (d) { return (x(d.key) - boxWidth / 2) })
      .attr("x2", function (d) { return (x(d.key) + boxWidth / 2) })
      .attr("y1", function (d) { return (y(d.value.max)) })
      .attr("y2", function (d) { return (y(d.value.max)) })
      .attr("stroke", "black")
      .style("width", 80)

  }
  wrap = (text) =>{
    text.each(function () {
      var text = d3.select(this), words = text.text().split("#").reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 2,
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy"));
        let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em").attr('font-size', '10px');



      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", lineNumber++ * lineHeight + dy + "em").attr('font-size', '10px').text(word);
      }
    });
  }
}
interface IFEObj{

  day: number
  min: number
  quartile1: number
  mean: number
  median: number
  quartile3: number
  max: number
  sampleSize: number
  patientsStillInHospital: number

}

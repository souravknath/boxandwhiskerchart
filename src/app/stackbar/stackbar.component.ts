import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from "d3";
import * as $ from "jquery";

@Component({
  selector: 'app-stackbar',
  templateUrl: './stackbar.component.html',
  styleUrls: ['./stackbar.component.css']
})
export class StackbarComponent implements OnInit {
  @ViewChild('stackBarChart',{static:true}) private chartContainer: ElementRef;
  @Input() private data: [];
  constructor(private hostRef:ElementRef) { }

  ngOnInit() {
    this.renderChart(this.data)
  }
  renderChart(data) {
    let el = this.chartContainer.nativeElement;
    let divWidth = $(this.hostRef.nativeElement).parent().width();
    d3.select(el).selectAll("*").remove();

    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = divWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    var svg = d3.select(el)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + 50),
       g = svg.append("g")
      .attr("transform",
        "translate(" + (margin.left + 20) + "," + margin.top + ")");
    // set x scale
    var x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);

    // set y scale
    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    // set the colors
    var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      //let data = 
      var keys = Object.keys(data[0]);

      //data.sort(function (a, b) { return b.total - a.total; });
      x.domain(data.map(function (d) { return d.State; }));
      y.domain([0, d3.max(data, function (d) { return d["Under 5 Years"]+d["5 to 13 Years"]+d["14 to 17 Years"]; })]).nice();
      z.domain(keys);

      g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter().append("g")
        .attr("fill", function (d) { return z(d.key); })
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { return x(d.data.State); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
        .on("mouseover", function () { tooltip.style("display", null); })
        .on("mouseout", function () { tooltip.style("display", "none"); })
        .on("mousemove", function (d) {
          console.log(d);
          var xPosition = d3.mouse(this)[0] - 5;
          var yPosition = d3.mouse(this)[1] - 5;
          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
          tooltip.select("text").text(d[1] - d[0]);
        });

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start");

      var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) { return d; });
    // Prep the tooltip bits, initial display is hidden
    var tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    tooltip.append("rect")
      .attr("width", 60)
      .attr("height", 20)
      .attr("fill", "white")
      .style("opacity", 0.5);

    tooltip.append("text")
      .attr("x", 30)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");
  }
}

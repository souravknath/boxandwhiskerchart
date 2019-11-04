import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  data:any= []
  unit: string[];

  constructor() { }

  ngOnInit() {
    this.data = [{
        breastfeedMethodPercentage: 0,
        day: 1,
        max: 996,
        mean: 560,
        median: 559.5,
        min: 123,
        noVolume: false,
        quartile1: 341.25,
        quartile3: 777.75,
        sampleSize: 2
      }, {
        breastfeedMethodPercentage: 0,
        day: 2,
        max: 1107,
        mean: 800,
        median: 600,
        min: 100,
        noVolume: false,
        quartile1: 300,
        quartile3: 750,
        sampleSize: 1
      },{
        breastfeedMethodPercentage: 0,
        day: 3,
        max: 1107,
        mean: 900,
        median: 450,
        min: 200,
        noVolume: false,
        quartile1: 350,
        quartile3: 600,
        sampleSize: 1
      },{
      breastfeedMethodPercentage: 40,
      day: 4,
      max: 600,
      mean: 485,
      median: 484.5,
      min: 369,
      noVolume: false,
      quartile1: 426.75,
      quartile3: 542.25,
      sampleSize: 2}]
    this.unit = ["Y Axis", "X Axis"]
  }

}

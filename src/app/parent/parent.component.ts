import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  data: any = []
  unit: string[];
  stackbarData: { "State": string; "Under 5 Years": number; "5 to 13 Years": number; "14 to 17 Years": number; }[];

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
    }, {
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
    }, {
      breastfeedMethodPercentage: 40,
      day: 4,
      max: 600,
      mean: 485,
      median: 484.5,
      min: 369,
      noVolume: false,
      quartile1: 426.75,
      quartile3: 542.25,
      sampleSize: 2
    }]
    this.unit = ["Y Axis", "X Axis"]
    this.stackbarData = [
      {
        "State": "KY",
        "Under 5 Years": 10,
        "5 to 13 Years": 8,
        "14 to 17 Years": 5,

      },
      {
        "State": "LA",
        "Under 5 Years": 15,
        "5 to 13 Years": 10,
        "14 to 17 Years": 8,
      },
      {
        "State": "KT",
        "Under 5 Years": 20,
        "5 to 13 Years": 10,
        "14 to 17 Years": 29,

      },
      {
        "State": "LM",
        "Under 5 Years": 25,
        "5 to 13 Years": 15,
        "14 to 17 Years": 35,

      },
      {
        "State": "TL",
        "Under 5 Years": 30,
        "5 to 13 Years": 20,
        "14 to 17 Years": 45,

      },
      {
        "State": "ZX",
        "Under 5 Years": 35,
        "5 to 13 Years": 25,
        "14 to 17 Years": 70,

      }, {
        "State": "MX",
        "Under 5 Years": 40,
        "5 to 13 Years": 30,
        "14 to 17 Years": 80,

      },
      {
        "State": "PO",
        "Under 5 Years": 13,
        "5 to 13 Years": 35,
        "14 to 17 Years": 70,

      },
      {
        "State": "WE",
        "Under 5 Years": 14,
        "5 to 13 Years": 40,
        "14 to 17 Years": 50,

      },
      {
        "State": "MM",
        "Under 5 Years": 31,
        "5 to 13 Years": 30,
        "14 to 17 Years": 25,

      },
      {
        "State": "JK",
        "Under 5 Years": 30,
        "5 to 13 Years": 25,
        "14 to 17 Years": 15,

      },
      {
        "State": "QR",
        "Under 5 Years": 28,
        "5 to 13 Years": 15,
        "14 to 17 Years": 12,

      },
      {
        "State": "OP",
        "Under 5 Years": 25,
        "5 to 13 Years": 20,
        "14 to 17 Years": 17,

      },
      {
        "State": "LP",
        "Under 5 Years": 7,
        "5 to 13 Years": 25,
        "14 to 17 Years": 15,

      },
      {
        "State": "GH",
        "Under 5 Years": 20,
        "5 to 13 Years": 22,
        "14 to 17 Years": 13,

      },
      {
        "State": "EF",
        "Under 5 Years": 18,
        "5 to 13 Years": 20,
        "14 to 17 Years": 11,

      },
      {
        "State": "CD",
        "Under 5 Years": 16,
        "5 to 13 Years": 18,
        "14 to 17 Years": 9,

      },
      {
        "State": "AB",
        "Under 5 Years": 14,
        "5 to 13 Years": 16,
        "14 to 17 Years": 6,

      },
      {
        "State": "MN",
        "Under 5 Years": 12,
        "5 to 13 Years": 14,
        "14 to 17 Years": 4,

      }
    ]
  }

}

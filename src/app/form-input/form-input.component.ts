import { Component, OnInit } from '@angular/core';
import { StreetType } from '../street-type';
import { StreetClass } from '../street-class';
@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {
  streetTypes: Array<StreetType>;
  selectedStreetType: StreetType;
  constructor() { }

  ngOnInit() {
    this.streetTypes = [
      {id: 1, name: "Full Street Closure", classifications:[
        {type: "Major - Striped Review", reviewFee: 814, dailyFee: 81},
        {type: "Major - Non-Striped Review", reviewFee: 543, dailyFee: 65},
        {type: "Minor - Striped Review", reviewFee: 543, dailyFee: 32},
        {type: "Minor - Non-Striped Review", reviewFee: 271, dailyFee: 21}
      ]},
      {id: 2, name: "Lane Obstruction", classifications:[
        {type: "Major - Striped Review", reviewFee: 814, dailyFee: 81},
        {type: "Major - Striped Review", reviewFee: 814, dailyFee: 81},
        {type: "Major - Striped Review", reviewFee: 814, dailyFee: 81},
        {type: "Major - Striped Review", reviewFee: 814, dailyFee: 81},
      ]},
      {id: 3, name: "Sidewalk Obstruction", classifications: [
        {type: "Major - Full Closure Review", reviewFee: 814, dailyFee: 48},
        {type: "Major - AUX Review", reviewFee: 407, dailyFee: 32},
        {type: "Major - Partial Closure Review", reviewFee: 407, dailyFee: 48},
        {type: "Major - Maintenance Review", reviewFee: 136, dailyFee: 16},
        {type: "Minor - Full Closure Review", reviewFee: 271, dailyFee: 32},
        {type: "Minor - AUX Review", reviewFee: 136, dailyFee: 32},
        {type: "Minor - Partial Review", reviewFee: 136, dailyFee: 16},
        {type: "Minor - Maintenance Review", reviewFee: 68, dailyFee: 16},
      ]}
    ];
     this.selectedStreetType = new StreetType(0, "", []);

  }

}

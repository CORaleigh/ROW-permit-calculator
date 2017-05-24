import { Component, OnInit } from '@angular/core';
import { StreetType } from '../street-type';
import { StreetClass } from '../street-class';
import { FeesService } from '../fees.service';
import { IMyDrpOptions } from 'mydaterangepicker';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
import { Obstruction } from '../obstruction';
import { SelectedObstructionService } from '../selected-obstruction.service';
import { PermitCard } from '../permit-card';


@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  providers: [FeesService, SelectedObstructionService]
})

export class FormInputComponent implements OnInit {
  duration: number;
  streetTypes: Array<StreetType>;
  //selectedStreetType: StreetType;
  cards: Array<PermitCard> = [];
  cardIndex: number;
  selectedObstructions: Array<Obstruction>;
  private reviewInfo: any;
  private startDate: any;
  private endDate: any;
  //private diff: number = this.endDate.diff(this.startDate);
  private formattedNum: number;
  private myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'mm-dd-yyyy'
  };
  constructor(private feesService: FeesService, private selectedObstructionService: SelectedObstructionService) { }

  ngOnInit() {
    this.cardIndex = -1;
    // let permitcard = new PermitCard();
    // permitcard.streetName = ""; 
    // permitcard.cardIndex = 0;
    // permitcard.streetClosureType = "";
    // permitcard.startDate;
    // permitcard.endDate;
    // this.cards.push(permitcard);
    this.addCard();

    this.streetTypes = [
      {id: 1, name: "Full Street Closure", classifications:[
        {type: "Major - Striped Review", reviewFee: 814, dailyFee: 81},
        {type: "Major - Non-Striped Review", reviewFee: 543, dailyFee: 65},
        {type: "Minor - Striped Review", reviewFee: 543, dailyFee: 32},
        {type: "Minor - Non-Striped Review", reviewFee: 271, dailyFee: 21}
      ]},
      {id: 2, name: "Lane Obstruction", classifications:[
        {type: "Major - Striped Review", reviewFee: 407, dailyFee: 32},
        {type: "Major - Non-Striped Review", reviewFee: 136, dailyFee: 32},
        {type: "Minor - Striped Review", reviewFee: 271, dailyFee: 32},
        {type: "Minor - Non-Striped Review", reviewFee: 136, dailyFee: 32},
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
     //this.selectedStreetType = new StreetType(0, "", []);

    
  }

  //this is from attempting to do it Justin's way, still trying to figure it out...
  getFees() {
    this.feesService.getFeeSchedule();
  }

  

  logClassification(event) {
    console.log(event.value.dailyFee);
    console.log(event.value.reviewFee);
    // let dailyFee = event.value.dailyFee;
    // let totalDailyFee = dailyFee * this.duration;
    // console.log(totalDailyFee);
  }

  // this.startDate = moment();
  // this.endDate = moment();
  // this.diff = this.endDate.diff(this.startDate);

  // createObjectKeys(duration){
  //   for(var i = 0; i < duration; i++) {
  //     let 
  //   }
  // }

  logDates(){
    console.log("start:", this.startDate + " " + "end:", this.endDate);
    let start: any = new Date(this.startDate);
    let end: any = new Date(this.endDate);
    let elapsed: any = (end - start) / 86400000;

    console.log(elapsed);
    //this.createObjectKeys(elapsed);
    
  }

  createDateRange(event) {
    console.log(event);
  }

  getSelectedObstructions(){
    this.selectedObstructionService.getObstructions();
  }

  addCard() {
    let permitcard = new PermitCard();
    permitcard.streetName = ""; 
    permitcard.cardIndex = 0;
    permitcard.streetClosureType = "";
    permitcard.startDate;
    permitcard.endDate;
    this.cards.push(permitcard);
    this.cardIndex += 1;
  }


}

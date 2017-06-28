import { Component, OnInit, Input, DoCheck, KeyValueDiffers } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PermitCard } from '../permit-card';
import * as moment from 'moment';

@Component({
  selector: 'calculator-output',
  templateUrl: './calculator-output.component.html',
  styleUrls: ['./calculator-output.component.css']
})
export class CalculatorOutputComponent implements OnInit {

  @Input() cards: Array<PermitCard>;
  @Input() cardIndex: number;
  @Input() frontages: Array<Array<PermitCard>>; 
  @Input() frontageIndex: number;
  @Input() dateDirectory: any = {};
  sourceOfTruthReviewFeeArray: any = [];
  dailyFeeTotal: number = 0;
  reviewFeeTotal: number = 0;
  totalTotal: number = 0;
  differ: any;
  permitcard: PermitCard;

  constructor(private differs: KeyValueDiffers) { 
    this.differ = differs.find({}).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    let card = this.frontages[this.frontageIndex][this.cardIndex];
    let changes = this.differ.diff(card);

    if(changes) {
      changes.forEachChangedItem(r => {
            
        if ((r.key !="cardIndex" && r.currentValue != "") && card.startDate != "" && card.endDate != "" && card.streetClosureType != {} && card.streetName != {}) {

          if(r.currentValue != r.previousValue){
            this.dailyFeeTotal = 0; 
            this.sourceOfTruthReviewFeeArray = []; 
            this.gatherCalcInfo(card);  
          } else {
            this.dailyFeeTotal = 0; 
            this.gatherCalcInfo(card); 
          }          
        } 
      });
    }
  }

  gatherCalcInfo(card) {

    let reviewFee = card.streetClosureType.reviewFee;
    let dailyFee = card.streetClosureType.dailyFee;
    let startDate = new Date(card.startDate);
    let endDate = new Date(card.endDate);
    let a: any = moment(endDate);
    let b: any = moment(startDate);
    let diffDays = a.diff(b, 'days');
    let dateDirectoryKeys: any = [];

    //push review fee to the main array as soon as a new card is added
    this.sourceOfTruthReviewFeeArray.push(reviewFee);

    //create the map of dates as keys given the date range
    for(var i = 1; i < (diffDays + 2); i++) { 
      // put this if statement in to solve for bug got when editing permit 
      if(i == 1) {
        this.dateDirectory = {};
      } 
      let newDate: any = moment(startDate).add(i, 'days');
      newDate = newDate[Object.keys(newDate)[5]];
      newDate = moment(newDate).format("MM DD YYYY");
        
      if(this.dateDirectory[newDate]) {
        this.dateDirectory[newDate].daily.push(dailyFee);
      } else {
        this.dateDirectory[newDate] = {
        daily: [dailyFee]
        }
      }
      
      dateDirectoryKeys = Object.keys( this.dateDirectory );
    }


    if(this.frontages[this.frontageIndex].length > 1) {
        this.dailyFeeTotal = 0; 
      } 

    
    for(var i = 0; i < dateDirectoryKeys.length; i++) { 
      let dailySum: number = Math.max.apply(null, this.dateDirectory[dateDirectoryKeys[i]].daily); 
      this.dailyFeeTotal += dailySum; 
    }

    // Just want highest review fee for one plan submission
    this.reviewFeeTotal = Math.max.apply(null, this.sourceOfTruthReviewFeeArray);
    this.totalTotal = this.dailyFeeTotal + this.reviewFeeTotal;

  }

}

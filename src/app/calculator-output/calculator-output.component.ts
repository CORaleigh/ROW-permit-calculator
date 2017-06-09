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
  dateDirectory: any = {};
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
    let card = this.cards[this.cards.length - 1];
    let changes = this.differ.diff(card);

    if(changes) {
      changes.forEachChangedItem(r => {
        console.log(r.key);
        if ((r.key !="cardIndex" && r.currentValue != "") && r.currentValue != r.previousValue && card.startDate != "" && card.endDate != "" && card.streetClosureType != {} && card.streetName != {}) {
          console.log("getting through the conditional", card);
          this.gatherCalcInfo(card);           
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
    
    
    for(var i = 1; i < (diffDays + 2); i++) {
      let newDate: any = moment(startDate).add(i, 'days');
      newDate = newDate[Object.keys(newDate)[5]];
      newDate = moment(newDate).format("MM DD YYYY");


      if(this.dateDirectory[newDate]) {
        this.dateDirectory[newDate].daily.push(dailyFee);
        this.dateDirectory[newDate].review.push(reviewFee);
      } else {
        this.dateDirectory[newDate] = {
        daily: [dailyFee],
        review: [reviewFee]
      }

      }

    }

  // This block not working for multiple permits in same date range 
  //  for (var date in this.dateDirectory) {
  //    let dailySum: number = Math.max.apply(null, this.dateDirectory[date].daily);
  //   //  this.dailyFeeTotal += dailySum;
  //    if(this.dailyFeeTotal == dailySum) {
  //      this.dailyFeeTotal = this.dailyFeeTotal;
  //    } else if(this.dailyFeeTotal < dailySum) {
  //      this.dailyFeeTotal = dailySum;
  //    } else {
  //      this.dailyFeeTotal += dailySum;
  //    }
      

  //    let sum: number = this.dateDirectory[date].review.reduce( (acc, val) => acc + val);

  //    if (this.reviewFeeTotal < sum) {
  //      this.reviewFeeTotal = sum;
  //    }
  //    console.log(this.dateDirectory);
      
  //  }

  //   this.totalTotal = this.dailyFeeTotal + this.reviewFeeTotal;

    let dateDirectoryKeys: any = Object.keys( this.dateDirectory );
    this.dailyFeeTotal = 0;
    this.reviewFeeTotal = 0;
   

    for(var i = 0; i < dateDirectoryKeys.length; i++) { // instead of 1, dateDirectoryKeys.length? 
      let dailySum: number = Math.max.apply(null, this.dateDirectory[dateDirectoryKeys[i]].daily); //only gets the first key's daily? 
    this.dailyFeeTotal = dailySum * (diffDays + 1); //diffDays is problematic, it's the diff between the most recently entered dates. need keys.length probably
    //  if(this.dailyFeeTotal == dailySum) {
    //    this.dailyFeeTotal = this.dailyFeeTotal;
    //  } else if(this.dailyFeeTotal < dailySum) {
    //    this.dailyFeeTotal = dailySum;
    //  } else {
    //    this.dailyFeeTotal += dailySum;
    //  }
      
    }

    for(var i = 0; i < dateDirectoryKeys.length; i++) {
      let sum: number = this.dateDirectory[dateDirectoryKeys[i]].review.reduce( (acc, val) => acc + val);

      if (this.reviewFeeTotal < sum) { //problems with the logic here, need to figure out how to distinguish between two permit types 
        this.reviewFeeTotal = sum;
      } else if(this.reviewFeeTotal == sum) {
        this.reviewFeeTotal = sum;
      } else {
        this.reviewFeeTotal += sum;
      }
    }
    this.totalTotal = this.dailyFeeTotal + this.reviewFeeTotal;

  }

}

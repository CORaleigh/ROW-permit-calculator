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
    let card = this.cards[this.cardIndex];
    let changes = this.differ.diff(card);
    console.log('pre conditional', card);

    if(changes) {
      changes.forEachChangedItem(r => {
        console.log(r.key);
        if ((r.key) && r.currentValue != r.previousValue && this.cardIndex === card.cardIndex) {
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


       
       
       console.log('new date is', newDate);
     }

     for (var date in this.dateDirectory) {
       this.dailyFeeTotal += Math.max.apply(null, this.dateDirectory[date].daily);

       let sum: number = this.dateDirectory[date].review.reduce( (acc, val) => acc + val);

       if (this.reviewFeeTotal <= sum) {
         this.reviewFeeTotal = sum;
       }
  
     }

     this.totalTotal = this.dailyFeeTotal + this.reviewFeeTotal;

  }

}

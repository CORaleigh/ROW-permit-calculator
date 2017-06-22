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
    let card = this.cards[this.cards.length - 1];
    let changes = this.differ.diff(card);

    if(changes) {
      changes.forEachChangedItem(r => {
        console.log('key', r.key);
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

    //push review fee to the main array as soon as a new card is added
    this.sourceOfTruthReviewFeeArray.push(reviewFee);

    
    //create the map of dates as keys given the date range
    for(var i = 1; i < (diffDays + 2); i++) {
      let newDate: any = moment(startDate).add(i, 'days');
      newDate = newDate[Object.keys(newDate)[5]];
      newDate = moment(newDate).format("MM DD YYYY");

      // if the date doesn't exist, create it; store daily fee
      if(this.dateDirectory[newDate]) {
        this.dateDirectory[newDate].daily.push(dailyFee);
      } else {
        this.dateDirectory[newDate] = {
        daily: [dailyFee]
        }
      }
    }

    let dateDirectoryKeys: any = Object.keys( this.dateDirectory );
    
   
    //this.dailyFeeTotal = 0; ... don't need this anymore since I'm 
    // blowing away the date directory every time a new frontage is added
    console.log('here is date directory upon new', this.dateDirectory);
    console.log('daily fee total before calc', this.dailyFeeTotal);  
    for(var i = 0; i < dateDirectoryKeys.length; i++) { 
      let dailySum: number = Math.max.apply(null, this.dateDirectory[dateDirectoryKeys[i]].daily); 
      this.dailyFeeTotal += dailySum; 
    }

    // Just want highest review fee for one plan submission
    this.reviewFeeTotal = Math.max.apply(null, this.sourceOfTruthReviewFeeArray);
    this.totalTotal = this.dailyFeeTotal + this.reviewFeeTotal;

  }

}

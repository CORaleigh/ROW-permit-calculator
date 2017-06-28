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
  lengthOfArrayOfPermitCards: number = 1; 
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
             
            if(this.lengthOfArrayOfPermitCards == this.frontages[this.frontageIndex].length && this.frontages[this.frontageIndex].length > 1) {
              console.log('length of array', this.frontages[this.frontageIndex].length);
              
              console.log('variables are same length and greater than one ');
              
              // this.dateDirectory = {};
              // this.dailyFeeTotal = 0; 
              this.gatherCalcInfo(card);
            } else if(this.lengthOfArrayOfPermitCards == this.frontages[this.frontageIndex].length && this.frontages[this.frontageIndex].length == 1) {
              console.log('variables equal and length one');
              
              // this.dateDirectory = 0; 
              // this.dateDirectory = {}
              this.gatherCalcInfo(card); 
            } else {
              console.log('normal call of function');
              
              this.gatherCalcInfo(card);
            } 
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
      // if(i == 1) {
      //   this.dateDirectory = {};
      // } 
      //new if statement to solve editing bug
      if(this.lengthOfArrayOfPermitCards == this.frontages[this.frontageIndex].length && i == 1){
        console.log('conditional to clear out date dir within for loop firing');
 
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
      console.log(i, dateDirectoryKeys);
      
    }


    if(this.frontages[this.frontageIndex].length > 1) {
        this.dailyFeeTotal = 0; 
      } 

    if(this.lengthOfArrayOfPermitCards == this.frontages[this.frontageIndex].length ) {
      console.log('daily fee set to zero because two variables length equal');
      
       this.dailyFeeTotal = 0; 
      } 

    for(var i = 0; i < dateDirectoryKeys.length; i++) {  
      let dailySum: number = Math.max.apply(null, this.dateDirectory[dateDirectoryKeys[i]].daily); 
      this.dailyFeeTotal += dailySum; 
    }

    // Just want highest review fee for one plan submission
    this.reviewFeeTotal = Math.max.apply(null, this.sourceOfTruthReviewFeeArray);
    this.totalTotal = this.dailyFeeTotal + this.reviewFeeTotal;

    this.lengthOfArrayOfPermitCards = this.frontages[this.frontageIndex].length; 

  }

}

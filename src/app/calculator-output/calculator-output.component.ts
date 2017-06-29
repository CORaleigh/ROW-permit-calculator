import { Component, OnInit, Input, Output, EventEmitter, DoCheck, KeyValueDiffers } from '@angular/core';
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
  @Input() flipCardToggle: boolean; 
  @Output() close: EventEmitter<any> = new EventEmitter();
  sourceOfTruthReviewFeeArray: any = [];
  lengthOfArrayOfPermitCards: number = 1; 
  dailyFeeTotal: number = 0;
  currentCardIndex: number = 0; 
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
      
    this.cardChangesLaunchCalculation(card); 
    
  }

  cardChangesLaunchCalculation(card) {
    let changes = this.differ.diff(card);
     if(changes && !this.flipCardToggle) {
          changes.forEachChangedItem(r => {

        if(r.key == "cardIndex") {
          console.log('current card index', this.currentCardIndex, 'card index', this.cardIndex);
          
          this.currentCardIndex = this.cardIndex; 
        }

        if((r.key == "endDate" || r.key == "startDate") && r.currentValue != r.previousValue) {
          let a = moment(r.currentValue);
          let b = moment(r.previousValue);
          let diff = null;
          if (r.key === "endDate") {
            diff = a.diff(b, 'days'); 
          } else {
            diff = b.diff(a, 'days'); 
          } 
          if(diff < 0) {
            for(var i = Math.abs(diff) - 1; i >= 0; i--) {
              let previous = null;
              if (r.key === "endDate") {
                previous = moment(r.previousValue).subtract(i, 'days').format('YYYY-MM-DD');                  
              } else if (r.key === "startDate") {
                previous = moment(r.previousValue).add(i, 'days').format('YYYY-MM-DD');  
              }
            let previousDateinDir = this.dateDirectory[previous]; 
            console.log('previous date in dir', previousDateinDir);
             
              let index = previousDateinDir.daily.map((e) => { return e.index;}).indexOf(this.cardIndex); 
              previousDateinDir.daily.splice(index, 1);
                  if( previousDateinDir.daily.length == 0) {
                  delete this.dateDirectory[previous];  
                   }              
              // if(index > -1) {
              //   for(var j = 0; j < previousDateinDir.daily.length; j++) {
              //   if(previousDateinDir.daily[j].index == this.cardIndex) {
              //     previousDateinDir.daily.splice(index, 1); 
              //     if( previousDateinDir.daily.length == 0) {
              //     delete this.dateDirectory[previous];  
              //      }
              //     }
              //   }
              // }
            }
          }
        }
            
        if (r.key !="cardIndex" && ( r.currentValue != "") && card.startDate != "" && card.endDate != "" && card.streetClosureType != {} && card.streetName != {}) {
          console.log(r.key);

          if(r.currentValue != r.previousValue){
            
            
             
            if(this.lengthOfArrayOfPermitCards == this.frontages[this.frontageIndex].length && this.frontages[this.frontageIndex].length > 1) {
              console.log('length of array', this.frontages[this.frontageIndex].length);
              
              console.log('variables are same length and greater than one ');
              
              // this.dateDirectory = {};
              // this.dailyFeeTotal = 0; 
              this.gatherCalcInfo(card);
            } else if(this.lengthOfArrayOfPermitCards == this.frontages[this.frontageIndex].length && this.frontages[this.frontageIndex].length == 1) {
              console.log('variables equal and length one');
              
               //this.dailyFeeTotal = 0; 
               //this.dateDirectory = {}
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
 
        //this.dateDirectory = {};
        //this.dailyFeeTotal = 0; 
      }
      
      let newDate: any = moment(startDate).add(i, 'days');
      newDate = newDate[Object.keys(newDate)[5]];
      newDate = moment(newDate).format("YYYY-MM-DD");
        
      if(this.dateDirectory[newDate]) {
        let object = {index: this.cardIndex,  fee: dailyFee}; 
        let matches = this.dateDirectory[newDate].daily.filter((fee) => fee.index == this.cardIndex);
        if(matches.length < 1) {
          this.dateDirectory[newDate].daily.push(object);
        } 
      } else {
        this.dateDirectory[newDate] = {
        daily: [{index: this.cardIndex,  fee: dailyFee}]
        }
      }
      
      dateDirectoryKeys = Object.keys( this.dateDirectory );
      console.log(this.dateDirectory);
      
      console.log(i, dateDirectoryKeys);
      
    }


    if(this.frontages[this.frontageIndex].length > 1) {
      console.log('daily fee total cleared because more than one frontage');
      
      this.dailyFeeTotal = 0; 

      } 
    
    //need length to be greater than 1 in addition to the length being same? need some other conditional
    // this is what enables editing 
    if(this.lengthOfArrayOfPermitCards == this.frontages[this.frontageIndex].length && this.frontages[this.frontageIndex].length > 1) {
      console.log('daily fee set to zero because two variables length equal');
      
       this.dailyFeeTotal = 0; 
      } 

      this.dailyFeeTotal = 0; 
    
    let dailyFeesArray: any = []; 
    for(var i = 0; i < dateDirectoryKeys.length; i++) {
      dailyFeesArray = []; 
      for(var j = 0; j < this.dateDirectory[dateDirectoryKeys[i]].daily.length; j++) {
        dailyFeesArray.push(this.dateDirectory[dateDirectoryKeys[i]].daily[j].fee); 
      } 
      let dailySum: number = Math.max.apply(null, dailyFeesArray); 
      this.dailyFeeTotal += dailySum; 
    }

    // Just want highest review fee for one plan submission
    this.reviewFeeTotal = Math.max.apply(null, this.sourceOfTruthReviewFeeArray);
    this.totalTotal = this.dailyFeeTotal + this.reviewFeeTotal;

    this.lengthOfArrayOfPermitCards = this.frontages[this.frontageIndex].length; 

    this.close.emit(false); 

    

  }

}



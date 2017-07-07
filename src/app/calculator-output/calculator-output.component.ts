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
          //console.log('current card index', this.currentCardIndex, 'card index', this.cardIndex);
          
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
            //console.log('previous date in dir', previousDateinDir);
             
              let index = previousDateinDir.daily[this.frontageIndex].map((e) => { return e.index;}).indexOf(this.cardIndex); 
              previousDateinDir.daily[this.frontageIndex].splice(index, 1);
                  if( previousDateinDir.daily[this.frontageIndex].length == 0) { 
                  delete this.dateDirectory[previous];  
                   }             
            }
          }
        }
            
        if (r.key !="cardIndex" && ( r.currentValue != "") && card.startDate != "" && card.endDate != "" && card.streetClosureType != {} && card.streetName != {}) {
          //console.log(r.key);

          if(r.currentValue != r.previousValue){
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
      
      let newDate: any = moment(startDate).add(i, 'days');
      newDate = newDate[Object.keys(newDate)[5]];
      newDate = moment(newDate).format("YYYY-MM-DD");
      let matches: any; 
        
      if(this.dateDirectory[newDate]) {
        if(this.dateDirectory[newDate].daily[this.frontageIndex]) {
          let object = {index: this.cardIndex,  fee: dailyFee}; 
          matches = this.dateDirectory[newDate].daily[this.frontageIndex].filter((fee) => fee.index == this.cardIndex);
        } else {
          matches = "   "; 
        }
        let object = {index: this.cardIndex,  fee: dailyFee};  
        if(matches.length < 1 && this.dateDirectory[newDate].daily[this.frontageIndex]) {
          //console.log(this.dateDirectory[newDate].daily[this.frontageIndex]);
          
          this.dateDirectory[newDate].daily[this.frontageIndex].push(object);
        } else {
          this.dateDirectory[newDate].daily[this.frontageIndex] = [{index: this.cardIndex,  fee: dailyFee}]; 
        }
      } else {
        //console.log('creating new nums'); 
        this.dateDirectory[newDate] = {
        daily: {
          [this.frontageIndex]: [{index: this.cardIndex,  fee: dailyFee}]
      }
        }
      }
      
      dateDirectoryKeys = Object.keys( this.dateDirectory );
      //console.log('this is the date directory', this.dateDirectory);
      
      
    }


    this.dailyFeeTotal = 0; 
    
    let dailyFeesArray: any = []; 
    for(var i = 0; i < dateDirectoryKeys.length; i++) {
      //console.log('first',this.dateDirectory[dateDirectoryKeys[i]]); 
      dailyFeesArray = []; 
      for(var j = 0; j <= this.frontageIndex ; j++) {
        var counter: number = 0;
        if(this.dateDirectory[dateDirectoryKeys[i]].daily[j]) {
          for(var k = 0; k < this.dateDirectory[dateDirectoryKeys[i]].daily[j].length; k++) {
           //console.log('date dir with values', this.dateDirectory); 
           //console.log('thing trying to pushed', this.dateDirectory[dateDirectoryKeys[i]].daily[j]);
            
           if(this.dateDirectory[dateDirectoryKeys[i]].daily[j][k].fee > counter) {
             counter = this.dateDirectory[dateDirectoryKeys[i]].daily[j][k].fee; 
             dailyFeesArray.push(counter);
           } 
          }  
        }
      } 
      //console.log(dailyFeesArray);
      
      let dailySum: number = dailyFeesArray.reduce((prev, curr) => prev + curr);  
      this.dailyFeeTotal += dailySum; 
      //console.log(this.dailyFeeTotal); 
    }

    // Just want highest review fee for one plan submission
    this.reviewFeeTotal = Math.max.apply(null, this.sourceOfTruthReviewFeeArray);
    this.totalTotal = this.dailyFeeTotal + this.reviewFeeTotal;

    this.lengthOfArrayOfPermitCards = this.frontages[this.frontageIndex].length; 

    this.close.emit(false); 

    

  }

}



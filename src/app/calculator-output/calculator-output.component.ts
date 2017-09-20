import { Component, OnInit, Input, Output, EventEmitter, DoCheck, KeyValueDiffers } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PermitCard } from '../permit-card';
import { GatherCalc } from '../gather-calc';
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
  @Input() frontageNamesDict: any; 
  @Output() close: EventEmitter<any> = new EventEmitter();
  sourceOfTruthReviewFeeArray: any = [];
  lengthOfArrayOfPermitCards: number = 1; 
  dailyFeeTotal: number = 0;
  currentCardIndex: number = 0; 
  reviewFeeTotal: number = 0;
  totalTotal: number = 0;
  differ: any; 
  permitcard: PermitCard;
  dailyFeesArray: any = [];
  largestDailyFeesDirectory: any = {};
  dateDirectoryPerFrontage: any = {}; 
  pdfTable: any = {}; 


  constructor(private differs: KeyValueDiffers) { 
    this.differ = differs.find({}).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    

    let card = this.frontages[this.frontageIndex][this.cardIndex];

      
    this.cardChangesLaunchCalculation(card); 
    
  }

  reset() {
    window.location.reload(); 
  }

  cardChangesLaunchCalculation(card) {
    let changes = this.differ.diff(card);
     if(changes && !this.flipCardToggle) {
          changes.forEachChangedItem(r => {
            //console.log(r); 
            //console.log(card); 
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
            
        if (r.key !="cardIndex" && ( r.currentValue != "") && card.startDate != "" && card.endDate != "" && card.streetClosureType != "" && card.streetName != {}) {
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
    
    // let dailyFeesArray: any = []; 
    for(var i = 0; i < dateDirectoryKeys.length; i++) {
      //console.log('first',this.dateDirectory[dateDirectoryKeys[i]]); 
      this.dailyFeesArray = []; 
      for(var j = 0; j <= this.frontageIndex ; j++) {
        var counter: number = 0;
        if(this.dateDirectory[dateDirectoryKeys[i]].daily[j]) {
          for(var k = 0; k < this.dateDirectory[dateDirectoryKeys[i]].daily[j].length; k++) {
           //console.log('date dir with values', this.dateDirectory); 
           //console.log('thing trying to pushed', this.dateDirectory[dateDirectoryKeys[i]].daily[j]);
            
           if(this.dateDirectory[dateDirectoryKeys[i]].daily[j][k].fee > counter) {
             counter = this.dateDirectory[dateDirectoryKeys[i]].daily[j][k].fee; 
             this.dailyFeesArray.push(counter);
           } 
          }  
        }
      } 

      if(this.dailyFeesArray.length == 0) {
        this.dailyFeesArray = [0]; //correcting for potential error with the misc. house moves that have no daily fee
      }
      
      //console.log('investigating matt error', dailyFeesArray);
      let dailySum: number = this.dailyFeesArray.reduce((prev, curr) => prev + curr);  
      this.dailyFeeTotal += dailySum; 
      //console.log(this.dailyFeeTotal); 
    }

    // Just want highest review fee for one plan submission
    this.reviewFeeTotal = Math.max.apply(null, this.sourceOfTruthReviewFeeArray);
    this.totalTotal = this.dailyFeeTotal + this.reviewFeeTotal;

    this.lengthOfArrayOfPermitCards = this.frontages[this.frontageIndex].length; 

    this.generateCostByFrontage(card); 

    this.close.emit(false); 

    

  }

  generateCostByFrontage(card) {

 
    let dailyFee = ""; 
    if(card.streetClosureType) {
        dailyFee = card.streetClosureType.dailyFee;
    } 

    let startDate = new Date(card.startDate);
    let endDate = new Date(card.endDate);
    let a: any = moment(endDate);
    let b: any = moment(startDate);
    let diffDays = a.diff(b, 'days');
    let dateDirectoryKeys: any = [];
    //let dailyFeeTotal: number = 0;

    //create the map of dates as keys given the date range
    for(var i = 1; i < (diffDays + 2); i++) { 
        
        let newDate: any = moment(startDate).add(i, 'days'); 
        newDate.format("MM-DD-YYYY"); 

        if(this.dateDirectoryPerFrontage[newDate]) {
            if(this.dateDirectoryPerFrontage[newDate][this.frontageIndex] != undefined){
                //this.dateDirectoryPerFrontage[newDate][this.frontageIndex] = [];
                this.dateDirectoryPerFrontage[newDate][this.frontageIndex].push(dailyFee);
            } else {
              this.dateDirectoryPerFrontage[newDate][this.frontageIndex] = [dailyFee]; 
            }

        } else {
                this.dateDirectoryPerFrontage[newDate] = {
                    [this.frontageIndex]: [dailyFee]
                    }; 
                }

        } 
        
        dateDirectoryKeys = Object.keys( this.dateDirectoryPerFrontage );
        


    if(!this.largestDailyFeesDirectory[this.frontageIndex]) {
        this.largestDailyFeesDirectory[this.frontageIndex] = []; 
    }

    this.largestDailyFeesDirectory[this.frontageIndex] = []; 
    for(var i = 0; i < dateDirectoryKeys.length; i++) {
        
        for(var j = 0; j <= this.frontageIndex ; j++) {
        var counterForFeeByFr: number = 0;
        if(this.dateDirectoryPerFrontage[dateDirectoryKeys[i]][j] && j == this.frontageIndex) {
           
            for(var k = 0; k < this.dateDirectoryPerFrontage[dateDirectoryKeys[i]][j].length; k++) {
              
            
            if(this.dateDirectoryPerFrontage[dateDirectoryKeys[i]][j][k] > counterForFeeByFr) {
              counterForFeeByFr = this.dateDirectoryPerFrontage[dateDirectoryKeys[i]][j][k]; 
                } 

            this.largestDailyFeesDirectory[this.frontageIndex].push(counterForFeeByFr);
            } 
              
        }
    }   
        
    }
    console.log('date dir ', this.dateDirectory); 
    console.log('date dir per frontage', this.dateDirectoryPerFrontage); 
    console.log('largest daily fees by frontage', this.largestDailyFeesDirectory);

    //return this.largestDailyFeesDirectory;
    this.generateTableForPdf();  
  }

  generateTableForPdf() {
    for(var n = 0; n <= this.frontageIndex; n++) {

      if(this.largestDailyFeesDirectory[n].length > 0) {
        this.largestDailyFeesDirectory[n] = this.largestDailyFeesDirectory[n].reduce((prev, curr) => prev + curr, 0);                    
        }

      } 

    let fees = this.largestDailyFeesDirectory; 
    let names = this.frontageNamesDict; 

    for(var m = 0; m <= this.frontageIndex; m++){
      if(!this.pdfTable[this.frontageNamesDict[m]]) {
        this.pdfTable[this.frontageNamesDict[m]] = this.largestDailyFeesDirectory[m]; 
      }
    }
    console.log(this.pdfTable); 
  }

}



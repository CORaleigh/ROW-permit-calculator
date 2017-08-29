import { image } from './export-button/image';
import { PermitCard } from './permit-card';
import * as moment from 'moment';

export class GatherCalc {

    // properties
    cardIndex: number;
    frontageIndex: number; 
    frontages: Array<Array<PermitCard>>; 
    frontageNamesDict: any;
    dailyFeesArray: any = [];
    dateDirectory: any = {};


    calc(card) {

        console.log('hi!', card); 

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
        let dailyFeeTotal: number = 0;

        //create the map of dates as keys given the date range
        for(var i = 1; i < (diffDays + 2); i++) { 
            
            let newDate: any = moment(startDate).add(i, 'days'); 
            
            if(this.dateDirectory[newDate]) {
  
                if(this.dateDirectory[newDate].daily[this.frontageIndex]) {
                    this.dateDirectory[newDate].daily[this.frontageIndex].push(dailyFee); //? 
                } else {
                    this.dateDirectory[newDate].daily[this.frontageIndex] = [dailyFee]; 
                    }

            } 
            
            dateDirectoryKeys = Object.keys( this.dateDirectory );
            
        }


        dailyFeeTotal = 0; //? 
        
     
        for(var i = 0; i < dateDirectoryKeys.length; i++) {
           
            this.dailyFeesArray = []; 
            for(var j = 0; j <= this.frontageIndex ; j++) {
            var counter: number = 0;
            if(this.dateDirectory[dateDirectoryKeys[i]].daily[j]) {
                for(var k = 0; k < this.dateDirectory[dateDirectoryKeys[i]].daily[j].length; k++) {
             
                
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
            
            
            let dailySum: number = this.dailyFeesArray.reduce((prev, curr) => prev + curr);  
            dailyFeeTotal += dailySum; 
            console.log('this is the daily fee total', dailyFeeTotal); 
        }
    }
}
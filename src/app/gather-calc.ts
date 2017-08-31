import { image } from './export-button/image';
import { PermitCard } from './permit-card';
import * as moment from 'moment';

export class GatherCalc {

    // properties
    // cardIndex: number;
    // frontageIndex: number; 
    // frontages: Array<Array<PermitCard>>; 
    frontageNamesDict: any;

    largestDailyFeesDirectory: any = {};
    dateDirectory: any = {};


    calc(card, cardIndex, frontageIndex, frontages) {

        //console.log('hi!', card); 

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
            newDate.format("MM-DD-YYYY"); 
    
            if(this.dateDirectory[newDate]) {
                if(this.dateDirectory[newDate][frontageIndex] != undefined){
                    this.dateDirectory[newDate][frontageIndex].push(dailyFee);
                } 

            } else {
                    this.dateDirectory[newDate] = {
                        [frontageIndex]: [dailyFee]
                        }; 
                    }

            } 
            
            dateDirectoryKeys = Object.keys( this.dateDirectory );
            


        dailyFeeTotal = 0; //? 
        
        console.log('date directory after looping', this.dateDirectory); 


        if(!this.largestDailyFeesDirectory[frontageIndex]) {
            this.largestDailyFeesDirectory[frontageIndex] = [0]; 
        }

        //console.log('daily fees before pushing anything',this.largestDailyFeesDirectory); 
     
        for(var i = 0; i < dateDirectoryKeys.length; i++) {
           
             
            for(var j = 0; j <= frontageIndex ; j++) {
            var counter: number = 0;
            if(this.dateDirectory[dateDirectoryKeys[i]][j]) {
                for(var k = 0; k < this.dateDirectory[dateDirectoryKeys[i]][j].length; k++) {
                 
                
                // console.log(dateDirectoryKeys); 
                //console.log(this.dateDirectory[dateDirectoryKeys[i]][j]); 
                // console.log('ijk', dateDirectoryKeys[i][j][k]); 
                // console.log('date dir w keys', this.dateDirectory); //perfect, exactly what expected 
                if(this.dateDirectory[dateDirectoryKeys[i]][j][k] > counter) {
                    counter = this.dateDirectory[dateDirectoryKeys[i]][j][k]; 
                    } 

                this.largestDailyFeesDirectory[frontageIndex].push(counter);
                } 
                 
            }
        } 


            // if(this.largestDailyFeesDirectory.length == 0) {
            // this.largestDailyFeesDirectory = [0]; //correcting for potential error with the misc. house moves that have no daily fee
            // }

            
            for(const frontage in this.largestDailyFeesDirectory) {

                if(this.largestDailyFeesDirectory[frontage].length) {
                    this.largestDailyFeesDirectory[frontage].reduce((prev, curr) => prev + curr);  
                }
            }   
           
        }
        console.log('largest daily fees by frontage', this.largestDailyFeesDirectory);

        //return this.largestDailyFeesDirectory; 
    }
}
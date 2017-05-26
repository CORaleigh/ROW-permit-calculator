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
  dailyFeeTotal: number;
  reviewFeeTotal: number;
  differ: any;
  permitcard: PermitCard;

  constructor(private differs: KeyValueDiffers) { 
    this.differ = differs.find({}).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    let card = this.cards[this.cardIndex];

    this.gatherCalcInfo(card);
  }

  gatherCalcInfo(card) {
     let reviewFee = card.streetClosureType.reviewFee;
     let dailyFee = card.streetClosureType.dailyFee;
     let startDate = new Date(card.startDate);
     let endDate = new Date(card.endDate);
    //  let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    //  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24) + 1); //do I need to add one here to include the start date?
     let a: any = moment(endDate);
     let b: any = moment(startDate);
     let diffDays = a.diff(b, 'days');
     
     for(var i = 1; i < (diffDays + 2); i++) {
       let newDate: any = moment(startDate).add(i, 'days');
       newDate = newDate[Object.keys(newDate)[5]];
       newDate = moment(newDate).format("MM DD YYYY");
       //let newDate = new Date(startDate.setTime( startDate.getTime() + (i * 43200000) ));
       //console.log(diffDays);
       //newDate._d
       
       
       console.log('new date is', newDate);
     }
  }

}

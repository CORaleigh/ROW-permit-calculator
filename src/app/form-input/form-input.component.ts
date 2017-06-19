import { Component, OnInit } from '@angular/core';
import { StreetType } from '../street-type';
import { StreetClass } from '../street-class';
import { FeesService } from '../fees.service';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
import { Obstruction } from '../obstruction';
import { SelectedObstructionService } from '../selected-obstruction.service';
import { PermitCard } from '../permit-card';


@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  providers: [FeesService, SelectedObstructionService]
})

export class FormInputComponent implements OnInit {
  duration: number;
  streetTypes: Array<StreetType>;
  //selectedStreetType: StreetType;
  cards: Array<PermitCard> = [];
  cardIndex: number;
  selectedObstructions: Array<Obstruction>;ˇ
  private reviewInfo: any;
  private startDate: any;
  private endDate: any;
  private formattedNum: number;

  constructor(private feesService: FeesService, private selectedObstructionService: SelectedObstructionService) { }

  ngOnInit() {
    this.cardIndex = -1;
   
    this.addCard();

    this.streetTypes = [
      {id: 1, name: "Full Street Closure", classifications:[
        {type: "Major - Striped", reviewFee: 814, dailyFee: 81},
        {type: "Major - Non-Striped", reviewFee: 543, dailyFee: 65},
        {type: "Minor - Striped", reviewFee: 543, dailyFee: 32},
        {type: "Minor - Non-Striped", reviewFee: 271, dailyFee: 21}
      ]},
      {id: 2, name: "Lane Obstruction", classifications:[
        {type: "Major - Striped", reviewFee: 407, dailyFee: 32},
        {type: "Major - Non-Striped", reviewFee: 136, dailyFee: 32},
        {type: "Minor - Striped", reviewFee: 271, dailyFee: 32},
        {type: "Minor - Non-Striped", reviewFee: 136, dailyFee: 32},
      ]},
      {id: 3, name: "Sidewalk Obstruction", classifications: [
        {type: "Major - Full Closure", reviewFee: 814, dailyFee: 48},
        {type: "Major - AUX", reviewFee: 407, dailyFee: 32},
        {type: "Major - Partial Closure", reviewFee: 407, dailyFee: 48},
        {type: "Major - Maintenance", reviewFee: 136, dailyFee: 16},
        {type: "Minor - Full Closure", reviewFee: 271, dailyFee: 32},
        {type: "Minor - AUX", reviewFee: 136, dailyFee: 32},
        {type: "Minor - Partial", reviewFee: 136, dailyFee: 16},
        {type: "Minor - Maintenance", reviewFee: 68, dailyFee: 16},
      ]},
      {id: 4, name: "Miscellaneous Right-of-Way Work", classifications: [
        {type: "Misc. - Major - Dumpster/Pod - Inspections (Per Day)", reviewFee: 0, dailyFee: 48},
        {type: "Misc. - Major - Non-Specific - Inspections (Per Day)", reviewFee: 0, dailyFee: 48},
        {type: "Misc. - Major - House Move", reviewFee: 136, dailyFee: 0},
        {type: "Misc. - Minor - House Move", reviewFee: 136, dailyFee: 0},
        {type: "Misc. - Minor - Dumpster/Pod - Inspections (Per Day)", reviewFee: 0, dailyFee: 32},
        {type: "Misc. - Minor - Non-Specific - Inspections (Per Day)", reviewFee: 0, dailyFee: 16}
      ]}
    ];
     //this.selectedStreetType = new StreetType(0, "", []);

    
  }

  addCard() {
    let permitcard = new PermitCard();
    permitcard.streetName = ""; 
    permitcard.cardIndex = 0;
    permitcard.cardIndex = this.cardIndex;
    permitcard.streetClosureType = "";
    permitcard.startDate = "";
    permitcard.endDate = "";
    this.cards.push(permitcard);
    this.cardIndex += 1;
  }

  removeCard(cards: Array<PermitCard>, index: number) {
    let card = cards[this.cardIndex];
    if (this.cardIndex === 0) {
      cards.shift();
      this.cardIndex += 1;
      cards.forEach(card => {
        card.cardIndex -= 1;
      });
    } else {
      cards.splice(index, 1);
      this.cardIndex -= 1;
    }
    
    // this.cardIndex -= 1;
  }  


  getPreviousCard() {
    this.cardIndex -= 1;
  }

  getNextCard() {
    this.cardIndex += 1;
  }


}

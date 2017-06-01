import { Component, OnInit, Input, DoCheck, KeyValueDiffers } from '@angular/core';
import { FormControl } from '@angular/forms';  
import { PermitCard } from '../permit-card';

@Component({
  selector: 'permit-listing',
  templateUrl: './permit-listing.component.html',
  styleUrls: ['./permit-listing.component.css']
})
export class PermitListingComponent implements OnInit, Input, DoCheck {

  @Input() cards: Array<PermitCard>;
  @Input() cardIndex: number;
  differ: any;
  permitcard: PermitCard;

  constructor(private differs: KeyValueDiffers) { 
    this.differ = differs.find({}).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    let card = this.cards[this.cardIndex];
  }

}

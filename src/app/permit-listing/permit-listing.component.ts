import { Component, OnInit, Input, DoCheck, KeyValueDiffers } from '@angular/core';
import { FormControl } from '@angular/forms';  
import { PermitCard } from '../permit-card';
import * as moment from 'moment';

@Component({
  selector: 'permit-listing',
  templateUrl: './permit-listing.component.html',
  styleUrls: ['./permit-listing.component.css']
})
export class PermitListingComponent implements OnInit, Input, DoCheck {

  @Input() cardIndex: number;
  @Input() frontageIndex: number; 
  @Input() frontages: Array<Array<PermitCard>>; 
  @Input() frontageNamesDict: any; 
  differ: any;
  permitcard: PermitCard;
  

  constructor(private differs: KeyValueDiffers) { 
    this.differ = differs.find({}).create(null);
  }

  ngOnInit() {
    

  }

  ngDoCheck() {
  }

}

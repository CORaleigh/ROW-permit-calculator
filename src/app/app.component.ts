import { Component, OnInit } from '@angular/core';

import { SelectedObstructionService } from './selected-obstruction.service';
import { Obstruction } from './obstruction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SelectedObstructionService]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  selectedObstructions: Obstruction[];

  ngOnInit(): void {
    this.getSelectedObstructions();
  }

  constructor(private selectedObstructionService: SelectedObstructionService) { }

  getSelectedObstructions(): void {
    this.selectedObstructionService.getObstructions().then(selectedObstructions => this.selectedObstructions = selectedObstructions);
  }
}

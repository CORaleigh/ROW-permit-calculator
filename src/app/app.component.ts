import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { SelectedObstructionService } from './selected-obstruction.service';
import { Obstruction } from './obstruction';
import * as moment from 'moment';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { SplashDialogComponent } from './splash-dialog/splash-dialog.component'; 

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
    window.setTimeout(() => {
      this.dialog.open(SplashDialogComponent);
    }, 500);
  }

  constructor(private selectedObstructionService: SelectedObstructionService, public dialog: MdDialog) { }

  getSelectedObstructions(): void {
    this.selectedObstructionService.getObstructions().then(selectedObstructions => this.selectedObstructions = selectedObstructions);
  }

  openDialog() {
    this.dialog.open(DialogContentComponent); 
  }
}


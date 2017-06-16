import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdDialog } from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import 'hammerjs';
import { FormInputComponent } from './form-input/form-input.component';
import { CalculatorOutputComponent } from './calculator-output/calculator-output.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import {MomentModule} from 'angular2-moment';
import * as moment from 'moment';
import { PermitListingComponent } from './permit-listing/permit-listing.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { SplashDialogComponent } from './splash-dialog/splash-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    FormInputComponent,
    CalculatorOutputComponent,
    PermitListingComponent,
    DialogContentComponent,
    SplashDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdButtonModule,
    MdCheckboxModule,
    CommonModule,
    MyDateRangePickerModule,
    MomentModule
  ],
  entryComponents: [DialogContentComponent, SplashDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

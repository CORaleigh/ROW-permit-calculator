import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import 'hammerjs';
import { FormInputComponent } from './form-input/form-input.component';
import { CalculatorOutputComponent } from './calculator-output/calculator-output.component';


@NgModule({
  declarations: [
    AppComponent,
    FormInputComponent,
    CalculatorOutputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdButtonModule,
    MdCheckboxModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

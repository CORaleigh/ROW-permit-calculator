import { Component, OnInit, Input, KeyValueDiffers, DoCheck, EventEmitter, Output } from '@angular/core';
import { PermitCard } from '../permit-card';
import { image } from './image'; 
import { GatherCalc } from '../gather-calc'; 

import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';

@Component({
  selector: 'export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.css'],
  providers: [GatherCalc]
})
export class ExportButtonComponent implements OnInit {

  constructor(private gather: GatherCalc, private differs: KeyValueDiffers) { 
    this.differ = differs.find({}).create(null);
  }

  // inputs
  @Input() cardIndex: number;
  @Input() frontageIndex: number; 
  @Input() frontages: Array<Array<PermitCard>>; 
  @Input() totalTotal: number;
  @Input() reviewFeeTotal: number; 
  @Input() pdfTable: any; 
 


  // class specific properties
  frontageDirectoryKeys: any = {}; 
  dailyFeesArray: any = [];
  dateDirectory: any = {};
  tableRowsArray: any = []; 
  differ: any;
  image: string = image; 

  ngOnInit() {
  }


  exportPdf() {
    this.frontageDirectoryKeys = Object.keys( this.pdfTable );
    pdfmake.vfs = pdfFonts.pdfMake.vfs;

    console.log(this.cardIndex);
    console.log(this.frontageIndex);
    console.log(this.frontages);
    console.log(this.dailyFeesArray);
    

    var docDefinition = {
      content: [],
      styles: {
        section: {
          fontSize: 9,
          color: '#FFFFFF',
          fillColor: '#2361AE',
          margin: [15, 15, 15, 100]
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        subheader2: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        titleHeader: {
          bold: true,
          color: 'white',
          fontSize: 18
        }
      }
    };
    docDefinition.content.push({
      canvas: [{
        type: 'rect',
        x: 0,
        y: 0,
        w: 500,
        h: 100,
        // lineWidth: 10,
        color: '#3f51b5'
      }]
    });

    docDefinition.content.push({
      text: 'City of Raleigh',
      style: 'titleHeader',
      absolutePosition: {
        x: 120,
        y: 65
      }
    });
    docDefinition.content.push({
      height: 50,
      width: 50,
      absolutePosition: {
        x: 50,
        y: 65
      },
      image: this.image
    });
   


    docDefinition.content.push({
      text: 'Right-of-Way Obstruction and Review Fees',
      style: 'subheader'
    });
    let table = {
      style: 'tableExample',
      table: {
        body: [
          [{
            text: 'Frontage/Fee       ',
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#eeeeee'
          }, {
            text: 'Fee        ',
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#eeeeee'
          }]
        ]
      }
    };


    for(const frontage in this.pdfTable) {
      table.table.body.push([{
        text: frontage,
        style: '',
        alignment: 'left',
        fillColor: ''
      }, {
        text: '$' + this.pdfTable[frontage],
        style: '',
        alignment: 'left',
        fillColor: ''
      }]);
    }

    table.table.body.push([{
      text: 'Permit        ',
      style: '',
      alignment: 'left',
      fillColor: ''
    }, {
      text: '$' + this.reviewFeeTotal,
      style: '',
      alignment: 'left',
      fillColor: ''
    }]);


    let totalTable = {
      style: 'tableExample',
      table: {
        body: [
          [{
            text: 'Total       ',
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#eeeeee'
          }, {
            text: '$' + this.totalTotal,
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#eeeeee'
          }]
        ]
      }
    };

    

    docDefinition.content.push(table);
    docDefinition.content.push(totalTable);
    let file = 'right-of-way-permit-fees.pdf';
    pdfmake.createPdf(docDefinition).download(file);
  }

}


import { Component, OnInit, Input, KeyValueDiffers, DoCheck } from '@angular/core';
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
  @Input() frontageNamesDict: any;


  // class specific properties
  dailyFeesArray: any = [];
  dateDirectory: any = {};
  tableRowsArray: any = []; 
  differ: any;
  image: string = image; 

  ngOnInit() {
  }

  ngDoCheck() {
    //let frontageChanges = this.differ.diff(this.frontages);
    let cardChanges = this.differ.diff(this.frontages[this.frontageIndex]);

    if(cardChanges) {
      this.generateTableRows(); 
    }
  }

  generateTableRows() {
    for (const frontage of this.frontages){
      for(const permitcard of frontage){
        this.gather.calc(permitcard);
      }  
    }
  }

  exportPdf() {
    pdfmake.vfs = pdfFonts.pdfMake.vfs;

    console.log(this.cardIndex);
    console.log(this.frontageIndex);
    console.log(this.frontages);
    console.log(this.frontageNamesDict);
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
    // docDefinition.content.push({
    //   text: 'Building and Trade Permit Calculator',
    //   style: 'titleHeader',
    //   absolutePosition: {
    //     x: 120,
    //     y: 90
    //   }
    // });
    // docDefinition.content.push({
    //   text: 'frontageNamesDict Details',
    //   style: 'subheader'
    // });
    // if (this.frontageNamesDict.length > 0) {
    //   docDefinition.content.push({
    //     text: 'frontageNamesDict Name',
    //     style: 'subheader2'
    //   });
    //   docDefinition.content.push({
    //     text: this.frontageNamesDict.name
    //   });
    // }
    // if (this.frontageNamesDict.length > 0) {
    //   docDefinition.content.push({
    //     text: 'frontageNamesDict Address',
    //     style: 'subheader2'
    //   });
    //   docDefinition.content.push({
    //     text: this.frontageNamesDict.address
    //   });
    // }
    // docDefinition.content.push({
    //   text: 'Valuation',
    //   style: 'subheader2'
    // });
    // docDefinition.content.push({
    //   text: '$' + Math.ceil(this.calculations.valuation).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   })
    // });


    docDefinition.content.push({
      text: 'Right-of-Way Obstruction and Review Fees',
      style: 'subheader'
    });
    let table = {
      style: 'tableExample',
      table: {
        body: [
          [{
            text: 'Frontage',
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#eeeeee'
          }, {
            text: 'Obstruction Type',
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#eeeeee'
          }, {
            text: 'Date Range',
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#eeeeee'
          }, {
            text: 'Daily Fee',
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#eeeeee'
          },{
            text: 'Review Fee',
            style: 'tableHeader',
            alignment: 'center',
            fillColor: '#eeeeee'
          }]
        ]
      }
    };
    // this.cards.forEach(card => {
    //   if (card.building.group && card.construction.key && card.constructScope.name && card.squareFeet) {
    //     table.table.body.push([{
    //       text: card.building.group,
    //       style: '',
    //       alignment: 'left',
    //       fillColor: ''
    //     }, {
    //       text: card.construction.key.toString(),
    //       style: '',
    //       alignment: 'left',
    //       fillColor: ''
    //     }, {
    //       text: card.constructScope.name,
    //       style: '',
    //       alignment: 'left',
    //       fillColor: ''
    //     }, {
    //       text: card.squareFeet.toLocaleString(undefined, {
    //         minimumFractionDigits: 0
    //       }),
    //       style: '',
    //       alignment: 'right',
    //       fillColor: ''
    //     }]);
    //   }
    // });

    // docDefinition.content.push(table);
    // docDefinition.content.push({
    //   text: 'Fee Details',
    //   style: 'subheader'
    // });
    // table = {
    //   style: 'tableExample',
    //   table: {
    //     body: [
    //       [{
    //         text: 'Description',
    //         style: 'tableHeader',
    //         alignment: 'center',
    //         fillColor: '#eeeeee'
    //       }, {
    //         text: 'Cost',
    //         style: 'tableHeader',
    //         alignment: 'center',
    //         fillColor: '#eeeeee'
    //       }, {
    //         text: 'Technology Fee',
    //         style: 'tableHeader',
    //         alignment: 'center',
    //         fillColor: '#eeeeee'
    //       }, {
    //         text: 'Total',
    //         style: 'tableHeader',
    //         alignment: 'center',
    //         fillColor: '#eeeeee'
    //       }]
    //     ]
    //   }
    // };
    // table.table.body.push([{
    //   text: 'Building Permit',
    //   style: '',
    //   alignment: 'left',
    //   fillColor: ''
    // }, {
    //   text: '$' + (this.calculations.building.value).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: '',
    //   alignment: 'right',
    //   fillColor: ''
    // }, {
    //   text: '$' + this.calculations.building.tech.toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: '',
    //   alignment: 'right',
    //   fillColor: ''
    // }, {
    //   text: '$' + (this.calculations.building.value + this.calculations.building.tech).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: 'tableHeader',
    //   alignment: 'right',
    //   fillColor: '#cccccc'
    // }]);
    // table.table.body.push([{
    //   text: 'Electrical Permit',
    //   style: '',
    //   alignment: 'left',
    //   fillColor: ''
    // }, {
    //   text: '$' + (this.calculations.electrical.value).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: '',
    //   alignment: 'right',
    //   fillColor: ''
    // }, {
    //   text: '$' + this.calculations.electrical.tech.toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: '',
    //   alignment: 'right',
    //   fillColor: ''
    // }, {
    //   text: '$' + (this.calculations.electrical.value + this.calculations.electrical.tech).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: 'tableHeader',
    //   alignment: 'right',
    //   fillColor: '#cccccc'
    // }]);
    // table.table.body.push([{
    //   text: 'Mechanical Permit',
    //   style: '',
    //   alignment: 'left',
    //   fillColor: ''
    // }, {
    //   text: '$' + (this.calculations.mechanical.value).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: '',
    //   alignment: 'right',
    //   fillColor: ''
    // }, {
    //   text: '$' + this.calculations.mechanical.tech.toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: '',
    //   alignment: 'right',
    //   fillColor: ''
    // }, {
    //   text: '$' + (this.calculations.mechanical.value + this.calculations.mechanical.tech).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: 'tableHeader',
    //   alignment: 'right',
    //   fillColor: '#cccccc'
    // }]);
    // table.table.body.push([{
    //   text: 'Plumbing Permit',
    //   style: '',
    //   alignment: 'left',
    //   fillColor: ''
    // }, {
    //   text: '$' + (this.calculations.plumbing.value).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: '',
    //   alignment: 'right',
    //   fillColor: ''
    // }, {
    //   text: '$' + this.calculations.plumbing.tech.toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: '',
    //   alignment: 'right',
    //   fillColor: ''
    // }, {
    //   text: '$' + (this.calculations.plumbing.value + this.calculations.plumbing.tech).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: 'tableHeader',
    //   alignment: 'right',
    //   fillColor: '#cccccc'
    // }]);
    // table.table.body.push([{
    //   text: 'Plan Review',
    //   style: '',
    //   alignment: 'left',
    //   fillColor: ''
    // }, {
    //   text: '$' + (this.calculations.review.value).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: '',
    //   alignment: 'right',
    //   fillColor: ''
    // }, {
    //   text: '$' + this.calculations.review.tech.toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: '',
    //   alignment: 'right',
    //   fillColor: ''
    // }, {
    //   text: '$' + (this.calculations.review.value + this.calculations.review.tech).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: 'tableHeader',
    //   alignment: 'right',
    //   fillColor: '#cccccc'
    // }]);
    // table.table.body.push([{
    //   text: 'Total',
    //   style: 'tableHeader',
    //   alignment: 'left',
    //   fillColor: '#cccccc'
    // }, {
    //   text: '$' + (this.calculations.building.value + this.calculations.electrical.value + this.calculations.mechanical.value + this.calculations.plumbing.value + this.calculations.review.value).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: 'tableHeader',
    //   alignment: 'right',
    //   fillColor: '#cccccc'
    // }, {
    //   text: '$' + (this.calculations.building.tech + this.calculations.electrical.tech + this.calculations.mechanical.tech + this.calculations.plumbing.tech + this.calculations.review.tech).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: 'tableHeader',
    //   alignment: 'right',
    //   fillColor: '#cccccc'
    // }, {
    //   text: '$' + (this.calculations.building.value + this.calculations.building.tech + this.calculations.electrical.value + this.calculations.electrical.tech + this.calculations.mechanical.value + this.calculations.mechanical.tech + this.calculations.plumbing.value + this.calculations.plumbing.tech + this.calculations.review.value + this.calculations.review.tech).toLocaleString(undefined, {
    //     minimumFractionDigits: 0
    //   }),
    //   style: 'tableHeader',
    //   alignment: 'right',
    //   fillColor: '#cccccc'
    // }]);
    docDefinition.content.push(table);
    let file = (this.frontageNamesDict.name) ? this.frontageNamesDict.name : 'right-of-way-permit-fees.pdf';
    pdfmake.createPdf(docDefinition).download(file);
  }

}


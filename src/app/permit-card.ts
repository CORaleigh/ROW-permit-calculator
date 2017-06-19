import * as moment from 'moment';
export class PermitCard {
    streetName: any;
    streetClosureType: any;
    startDate: any;
    endDate: any;
    cardIndex: number;
    calcDuration() {
        let startDate = new Date(this.startDate);
        let endDate = new Date(this.endDate);
        let a: any = moment(endDate);
        let b: any = moment(startDate);
        let diffDays = a.diff(b, 'days');

        return diffDays + 1;
    }
}

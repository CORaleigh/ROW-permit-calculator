export class StreetClass {
    constructor(type: string, reviewFee:number, dailyFee:number) {
        this.type = type;
        this.reviewFee = reviewFee;
        this.dailyFee = dailyFee;
    }
    type: string;
    reviewFee: number;
    dailyFee: number;
}

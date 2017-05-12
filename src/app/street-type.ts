import { StreetClass } from './street-class';
export class StreetType {
    constructor(id:number, name:string, classifications: Array<StreetClass>) {
        this.id = id;
        this.name = name;
        this.classifications = classifications;
    }
    id: number;
    name: string;
    classifications: Array<StreetClass>;
}

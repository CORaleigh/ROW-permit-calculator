import { Injectable } from '@angular/core';

import { Obstruction } from './obstruction';
import { currentObstructionsArray } from './current-obstructions';

@Injectable()
export class SelectedObstructionService {

  constructor() { }

  getObstructions(): Promise<Obstruction[]> {
    return Promise.resolve(currentObstructionsArray);
  }

}

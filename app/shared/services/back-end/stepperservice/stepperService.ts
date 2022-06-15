import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {LineModel} from "../../../model/response-payload/invoice/line.model";

@Injectable()
export class StepperService {

  private lineTotalListe = new BehaviorSubject<Array<LineModel>>(null);
  $lineTotalListe = this.lineTotalListe.asObservable();

  constructor() { }

  nextLineToList(lineTotalList: LineModel[]) {
    this.lineTotalListe.next(lineTotalList);
  }
}

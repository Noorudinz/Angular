import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {

  static dateVaidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'MM/YYYY', true).isValid()) {
      return { 'dateVaidator': true };
    }
    return null;
  }

  static dateFormat(dateString: string){
    return  moment(dateString, 'MM/YYYY', true).isValid();
  }

  static convertToDate(dateString: string){
    var parts = ('01/'+ dateString).split("/");
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }

}


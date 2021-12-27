import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { PaymentsService } from 'src/services/payments.service';
import { loadPayment, loadPaymentSuccess, loadSummary, loadSummarySuccess } from './payments.actions';


@Injectable()
export class PaymentsEffects {
  constructor(private actions$: Actions, private paymentService: PaymentsService) {}

  loadPayment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPayment),
      mergeMap((action) => {
        return this.paymentService.getReceipts().pipe(
          map((payments) => {
            return loadPaymentSuccess({ payments });
          })
        );
      })
    );
  });
}

@Injectable()
export class SummaryEffects {
  constructor(private actions$: Actions, private paymentService: PaymentsService) {}

  loadSummary$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSummary),
      mergeMap((action) => {
        return this.paymentService.getSummaryStore().pipe(
          map((summary) => {
            return loadSummarySuccess({ summary });
          })
        );
      })
    );
  });

}

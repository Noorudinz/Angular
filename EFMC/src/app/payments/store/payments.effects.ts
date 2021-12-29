import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { PaymentsService } from 'src/services/payments.service';
import { loadPayment, loadPaymentSuccess, loadSummary, loadSummarySuccess } from './payments.actions';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';


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

  getPaymentByFlatNo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/payments/receipts/view/');
      }),
      map((r: RouterNavigatedAction) => {
        let url = r.payload.routerState.url;
        const param =  url.substring(url.lastIndexOf('/') + 1);
        return param;
      }),
      switchMap((id) => {
        return this.paymentService.getReceiptDetailStore(id).pipe(
          map((bill) => {
            const billData = [{ ...bill, id }];
            return loadPaymentSuccess({ payments: billData });
          })
        );
      })
    );
  });

  getSummaryDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/payments/summary/details');
      }),
      map((r: RouterNavigatedAction) => {
        let url = r.payload.routerState.url;
        const param =  url.substring(url.lastIndexOf('/') + 1);
        return param;
      }),
      switchMap((id) => {
        return this.paymentService.getSummaryDetailStore(id).pipe(
          map((bill) => {
            const billData = [{ ...bill, id }];
            return loadSummarySuccess({ summary: billData });
          })
        );
      })
    );
  });

}

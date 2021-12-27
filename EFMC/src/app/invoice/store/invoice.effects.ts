import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { FlatOwnersService } from 'src/services/flat-owners.service';
import { InvoiceService } from 'src/services/invoice.service';
import { loadInvoices, loadInvoicesSuccess } from './invoice.actions';

@Injectable()
export class InvoiceEffects {
  constructor(private actions$: Actions, private invoiceService: InvoiceService) {}

  loadInvoices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadInvoices),
      mergeMap((action) => {
        return this.invoiceService.getBillsStore().pipe(
          map((invoices) => {
            return loadInvoicesSuccess({ invoices });
          })
        );
      })
    );
  });

  // addPost$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(addPost),
  //     mergeMap((action) => {
  //       return this.postsService.addPost(action.post).pipe(
  //         map((data) => {
  //           const post = { ...action.post, id: data.name };
  //           return addPostSuccess({ post });
  //         })
  //       );
  //     })
  //   );
  // });

  // updatePost$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(updatePost),
  //     switchMap((action) => {
  //       return this.postsService.updatePost(action.post).pipe(
  //         map((data) => {
  //           return updatePostSuccess({ post: action.post });
  //         })
  //       );
  //     })
  //   );
  // });

  // deletePost$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(deletePost),
  //     switchMap((action) => {
  //       return this.postsService.deletePost(action.id).pipe(
  //         map((data) => {
  //           console.log(action.id);
  //           console.log(data);
  //           return deletePostSuccess({ id: action.id });
  //         })
  //       );
  //     })
  //   );
  // });

  // getSinglePost$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ROUTER_NAVIGATION),
  //     filter((r: RouterNavigatedAction) => {
  //       return r.payload.routerState.url.startsWith('/posts/details');
  //     }),
  //     map((r: RouterNavigatedAction) => {
  //       return r.payload.routerState['params']['id'];
  //     }),
  //     switchMap((id) => {
  //       return this.postsService.getPostById(id).pipe(
  //         map((post) => {
  //           const postData = [{ ...post, id }];
  //           return loadPostsSuccess({ posts: postData });
  //         })
  //       );
  //     })
  //   );
  // });

}

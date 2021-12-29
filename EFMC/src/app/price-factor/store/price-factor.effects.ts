import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';


import { loadFactor, loadFactorSuccess, updateFactor, updateFactorSuccess } from './price-factor.actions';
import { PriceFactorService } from 'src/services/price-factor.service';

@Injectable()
export class PriceFactorEffects {
  constructor(private actions$: Actions, private priceFactorService: PriceFactorService) {}

  loadFactor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFactor),
      mergeMap((action) => {
        return this.priceFactorService.getPriceFactorStore().pipe(
          map((factors) => {
            return loadFactorSuccess({ factors });
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

  updateFactor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateFactor),
      switchMap((action) => {
        return this.priceFactorService.updatePriceFactorStore(action.factor).pipe(
          map((data) => {
            return updateFactorSuccess({ factor: action.factor });
          })
        );
      })
    );
  });

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

import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { FlatOwnersService } from 'src/services/flat-owners.service';
import { addFlat, addFlatSuccess, loadFlats, loadFlatsSuccess } from './flat-owner.actions';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';

@Injectable()
export class FlatsEffects {
  constructor(private actions$: Actions, private flatService: FlatOwnersService) {}

  loadFlats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFlats),
      mergeMap((action) => {
        return this.flatService.getFlatOwners().pipe(
          map((flats) => {
            return loadFlatsSuccess({ flats });
          })
        );
      })
    );
  });

  addFlat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addFlat),
      mergeMap((action) => {
        return this.flatService.addFlatStore(action.addFlatOwner).pipe(
          map((data) => {
            const flat = { ...action.addFlatOwner };
            return addFlatSuccess({ flat });
          })
        );
      })
    );
  });

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

  getSingleFlat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/flat-owners/details');
      }),
      map((r: RouterNavigatedAction) => {
        let url = r.payload.routerState.url;
        const param =  url.substring(url.lastIndexOf('/') + 1);
        return param;
      }),
      switchMap((id) => {
        return this.flatService.getFlatById(id).pipe(
          map((flat) => {
            const flatData = [{ ...flat, id }];
            return loadFlatsSuccess({ flats: flatData });
          })
        );
      })
    );
  });

}

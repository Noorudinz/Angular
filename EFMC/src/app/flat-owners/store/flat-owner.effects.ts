import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { FlatOwnersService } from 'src/services/flat-owners.service';
import { loadFlats, loadFlatsSuccess } from './flat-owner.actions';

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
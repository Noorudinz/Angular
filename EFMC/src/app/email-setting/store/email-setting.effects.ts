import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { EmailSettingService } from 'src/services/email-setting.service';
import { getEmailById, loadEmail, loadEmailSuccess, updateEmail, updateEmailSuccess } from './email-setting.actions';

@Injectable()
export class EmailSettingEffects {
  constructor(private actions$: Actions, private emailService: EmailSettingService) {}

  loadEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadEmail),
      mergeMap((action) => {
        return this.emailService.getEmailSettingStore().pipe(
          map((emails) => {
            return loadEmailSuccess({ emails });
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

  updateEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateEmail),
      switchMap((action) => {
        return this.emailService.updateEmailStore(action.email).pipe(
          map((data) => {
            return updateEmailSuccess({ email: action.email });
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

  getEmailById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getEmailById),
      mergeMap((action) => {
        return this.emailService.getEmailByIdStore(action.id).pipe(
          map((emails) => {
            return loadEmailSuccess({ emails });
          })
        );
      })
    );
  });

}

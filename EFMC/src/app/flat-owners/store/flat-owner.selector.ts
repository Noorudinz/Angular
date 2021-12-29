import { FlatsState } from './flat-owner.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
export const FLATS_STATE_NAME = 'flats';

const getFlatsState = createFeatureSelector<FlatsState>(FLATS_STATE_NAME);

export const getFlats = createSelector(getFlatsState, (state) => {
  return state.flats;
});

export const getFlatById = createSelector(
  getFlats,
  getCurrentRoute,
  (flats, route: RouterStateUrl) => {
     return flats ? flats.find((flat) => flat.flatNo === route.params['id']) : null;
  }
);

// export const getFlatById = (id) => createSelector(getFlatsState, (state) => {
//   console.log(id);
//   return state.flats ? state.flats.find((flat) => flat.flatNo === id) : null;
// });

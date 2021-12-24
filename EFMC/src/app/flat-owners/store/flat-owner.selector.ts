import { FlatsState } from './flat-owner.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const FLATS_STATE_NAME = 'flats';

const getFlatsState = createFeatureSelector<FlatsState>(FLATS_STATE_NAME);

export const getFlats = createSelector(getFlatsState, (state) => {
  return state.flats;
});

// export const getFlatById = createSelector(
//   getFlats,
//   getCurrentRoute,
//   (flats, route: RouterStateUrl) => {
//     return flats ? flats.find((flat) => flat.flatNo === route.params['flatNo']) : null;
//   }
// );

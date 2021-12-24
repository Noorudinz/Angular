import { FactorsState } from './price-factor.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const FACTOR_STATE_NAME = 'factors';

const getFactorsState = createFeatureSelector<FactorsState>(FACTOR_STATE_NAME);

export const getFactors = createSelector(getFactorsState, (state) => {
  return state.factors;
});

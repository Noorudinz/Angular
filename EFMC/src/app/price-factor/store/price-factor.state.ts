import { PriceFactorData } from './../price-factor.model';

export interface FactorsState {
  factors: PriceFactorData[];
}

export const initialState: FactorsState = {
  factors: null,
};

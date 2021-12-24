import { FlatList } from './../flat-owners.model';

export interface FlatsState {
  flats: FlatList[];
}

export const initialState: FlatsState = {
  flats: null,
};

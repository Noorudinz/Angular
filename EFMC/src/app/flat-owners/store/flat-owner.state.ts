import { FlatOwnersService } from 'src/services/flat-owners.service';
import { FlatList, FlatOwners } from './../flat-owners.model';

export interface FlatsState {
  flats: FlatList[];
  flatsData: FlatOwners[];
}

export const initialState: FlatsState = {
  flats: null,
  flatsData: null
};

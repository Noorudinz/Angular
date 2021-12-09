

import { Building } from "../building.model";

export interface BuildingState {
  buildings: Building[];
}

export const initialState: BuildingState = {
  buildings: null,
};

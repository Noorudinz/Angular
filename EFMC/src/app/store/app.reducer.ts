import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUser from '../user/store/user.reducer';
import * as fromBuilding from '../building-master/store/building.reducer'
import { BuildingState } from '../building-master/store/building.state';
import { BUILDING_STATE_NAME } from '../building-master/store/building.selector';

import * as fromFlatOwner from '../flat-owners/store/flat-owner.reducer';
import { FlatsState } from '../flat-owners/store/flat-owner.state';
import { FLATS_STATE_NAME } from '../flat-owners/store/flat-owner.selector';

import * as fromPriceFactor from '../price-factor/store/price-factor.reducer';
import { FactorsState } from '../price-factor/store/price-factor.state';
import { FACTOR_STATE_NAME } from '../price-factor/store/price-factor.selector';

import * as fromEmailSetting from '../email-setting/store/email-setting.reducer';
import { EmailsState } from '../email-setting/store/email-setting.state';
import { EMAIL_STATE_NAME } from '../email-setting/store/email-setting.selector';

import * as fromInvoiceBills from '../invoice/store/invoice.reducer';
import { InvoiceState } from '../invoice/store/invoice.state';
import { INVOICES_STATE_NAME } from '../invoice/store/invoice.selector';

// import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
// import * as fromRecipes from '../recipes/store/recipe.reducer';

export interface AppState {
  auth: fromAuth.State;
  user: fromUser.State;
  role: fromUser.State;
  [BUILDING_STATE_NAME]: BuildingState;
  [FLATS_STATE_NAME]: FlatsState;
  [FACTOR_STATE_NAME]: FactorsState;
  [EMAIL_STATE_NAME]: EmailsState;
  [INVOICES_STATE_NAME]: InvoiceState;

}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducer,
  role: fromUser.roleReducer,
  [BUILDING_STATE_NAME]: fromBuilding.buildingsReducer,
  [FLATS_STATE_NAME]: fromFlatOwner.flatsReducer,
  [FACTOR_STATE_NAME]: fromPriceFactor.factorsReducer,
  [EMAIL_STATE_NAME]: fromEmailSetting.emailsReducer,
  [INVOICES_STATE_NAME]: fromInvoiceBills.invoicesReducer
};

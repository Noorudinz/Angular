import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { filter, map, mergeMap, switchMap } from "rxjs/operators";
import { BuildingService } from "src/services/building.service";
import { addBuilding, addBuildingSuccess, getBuildingById, loadBuilding, loadBuildingSuccess, updateBuilding, updateBuildingSuccess } from "./building.actions";


@Injectable()
export class BuildingsEffects {
  constructor(private actions$: Actions, private buildingService: BuildingService) {}

  loadBuilding$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBuilding),
      mergeMap((action) => {
        return this.buildingService.getBuildings().pipe(
          map((buildings) => {
            return loadBuildingSuccess({ buildings });
          })
        );
      })
    );
  });

  addBuilding$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addBuilding),
      mergeMap((action) => {
        return this.buildingService.addBuilding(action.addorUpdate).pipe(
          map((data) => {
            const building = { ...action.addorUpdate };
            return addBuildingSuccess({ building });
          })
        );
      })
    );
  });

  getBuildingById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBuildingById),
      mergeMap((action) => {
        return this.buildingService.getBuildingByIdStore(action.id).pipe(
          map((buildings) => {
            return loadBuildingSuccess({ buildings });
          })
        );
      })
    );
  });

  updateBuilding$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateBuilding),
      switchMap((action) => {
        return this.buildingService.updateBuilding(action.building).pipe(
          map((data) => {
            return updateBuildingSuccess({ building: action.building });
          })
        );
      })
    );
  });

}




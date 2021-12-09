import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from "rxjs/operators";
import { BuildingService } from "src/services/building.service";
import { loadBuilding, loadBuildingSuccess } from "./building.actions";


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

}




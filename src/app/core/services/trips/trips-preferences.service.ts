import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from '@shared/models/store-state.model';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ApiResponse } from '@shared/models/api-response.model';
import { TripQuery } from '@shared/models/trips/trip-query.model';
import { SettingCategories } from 'app/profile/enumerations/setting-categories.enum';
import { UserSettingsService } from '../profile/user-settings.service';
import { UserSetting } from '@shared/models/profile/user-setting.model';

@Injectable({
  providedIn: 'root'
})
export class TripsPreferencesService extends ObservableStore<StoreState> {
  constructor(private userSettings: UserSettingsService) {
    super({ trackStateHistory: true });
  }

  /**
   * Retrieves the latest Trip Query values as they're stored in the DB
   * @returns - Latest Trip Query values from API
   */
  private getTripQueryFromDB(): Observable<TripQuery> {
    return forkJoin({
      userSettings: this.userSettings.getUserSettings(),
      userOptions: this.userSettings.getUserOptions()
    }).pipe(
      map((resp) => {
        // Settings
        const terminal =
          resp?.userSettings?.find(
            (setting) => setting.settingCategory === SettingCategories.Terminal
          )?.settings || [];
        const tripRole =
          resp?.userSettings?.find(
            (setting) => setting.settingCategory === SettingCategories.Role
          )?.settings || [];
        const tripStatus =
          resp?.userSettings?.find(
            (setting) => setting.settingCategory === SettingCategories.Status
          )?.settings || [];

        // Options
        const tripCategory = resp?.userOptions?.tripCategories
          ?.filter((tc) => tc.isSelected)
          ?.map((tc) => tc.tripCategoryId);
        const truckCategory = resp?.userOptions?.truckCategories
          ?.filter((tc) => tc.isSelected)
          ?.map((tc) => tc.truckCategoryId);
        const driverCategory = resp?.userOptions?.driverCategories
          ?.filter((dc) => dc.isSelected)
          ?.map((dc) => dc.driverCategoryId);

        const tripQuery: TripQuery = {
          // Settings
          terminal,
          tripRole,
          tripStatus,
          // Options
          tripCategory,
          truckCategory,
          driverCategory
        };
        this.setState({ tripQuery }, TripQueryStoreAction.GetTripQuery);
        return tripQuery;
      })
    );
  }

  /**
   * Retrieves the Trips Query either from the DB or cache
   * @returns - Trips Query values (coming either from the reposiory or cache)
   */
  getTripQuery(): Observable<TripQuery> {
    const state = this.getState();
    if (state && state.tripQuery) {
      return of(state.tripQuery);
    } else {
      return this.getTripQueryFromDB();
    }
  }

  /**
   * Replaces the Trips Query that is currently stored in the DB
   * with the one passed-in as the argument
   * @param dataToSave - New Trip Query values to be saved
   * @returns - Latest Trip Query values from the DB
   */
  updateTripQuery(dataToSave: TripQuery): Observable<ApiResponse> {
    const userSettingsToSave: UserSetting[] = [];
    userSettingsToSave.push({
      settingCategory: SettingCategories.DriverCategory,
      settings: dataToSave.driverCategory
    });
    userSettingsToSave.push({
      settingCategory: SettingCategories.Terminal,
      settings: dataToSave.terminal
    });
    userSettingsToSave.push({
      settingCategory: SettingCategories.TripCategory,
      settings: dataToSave.tripCategory
    });
    userSettingsToSave.push({
      settingCategory: SettingCategories.Role,
      settings: dataToSave.tripRole
    });
    userSettingsToSave.push({
      settingCategory: SettingCategories.Status,
      settings: dataToSave.tripStatus
    });
    userSettingsToSave.push({
      settingCategory: SettingCategories.TruckCategory,
      settings: dataToSave.truckCategory
    });
    const updateObservable =
      this.userSettings.updateUserSettings(userSettingsToSave);
    const fetchObservable = this.getTripQueryFromDB();
    return updateObservable.pipe(
      concatMap((updateResponse) =>
        fetchObservable.pipe(map(() => updateResponse))
      )
    );
  }
}

/**
 * Name of the Actions that can be used to trace in the state history.
 */
enum TripQueryStoreAction {
  GetTripQuery = 'GetTripQuery'
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { UserOptionDto } from '@shared/dtos/profile/user-option.dto';
import { UserSettingToSaveDto } from '@shared/dtos/profile/user-setting-to-save.dto';
import { UserSettingDto } from '@shared/dtos/profile/user-setting.dto';
import { ResponseStatus } from '@shared/enumerations/core/response-status.enum';
import { StoreState } from '@shared/models/store-state.model';
import { DriverCategory } from '@shared/models/driver-data/driver-category.model';
import { TruckCategory } from '@shared/models/equip-compliancy/truck-category.model';
import { SettingCategory } from '@shared/models/profile/setting-category.model';
import { UserSetting } from '@shared/models/profile/user-setting.model';
import { ApiResponse } from '@shared/models/api-response.model';
import { TripCategory } from '@shared/models/trips/trip-category.model';
import { SettingCategories } from 'app/profile/enumerations/setting-categories.enum';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { EnvService } from '../env.service';
import { categoriesData } from '../../../../../mocks/data/trip/categories';
import { settingsCategoriesData } from '../../../../../mocks/data/trip/settingsCategories';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService extends ObservableStore<StoreState> {
  constructor(private http: HttpClient, private environment: EnvService) {
    super({ trackStateHistory: true });
  }

  /**
   * Retrieves the latest setting categories as they're stored in the DB
   * @returns - Latest setting categories from API
   */
  private getSettingCategoriesFromDB(): Observable<SettingCategory[]> {
    return of(settingsCategoriesData);
  }

  /**
   * Retrieves the Setting Categories either from the DB or cache
   * @returns - Setting Categories (coming either from the reposiory or cache)
   */
  getSettingCategories(): Observable<SettingCategory[]> {
    const state = this.getState();
    if (state && state.settingCategories) {
      return of(state.settingCategories);
    } else {
      return this.getSettingCategoriesFromDB();
    }
  }

  /**
   * Retrieves the Trip Categories that current user has access to
   * @returns - Array of Trip Categories
   */
  getTripCategories(): Observable<TripCategory[]> {
    return this.getUserOptions(SettingCategories.TripCategory).pipe(
      map((resp) => resp.tripCategories)
    );
  }

  /**
   * Retrieves the Truck Categories that current user has access to
   * @returns - Array of Truck Categories
   */
  getTruckCategories(): Observable<TruckCategory[]> {
    return this.getUserOptions(SettingCategories.TruckCategory).pipe(
      map((resp) => resp.truckCategories)
    );
  }

  /**
   * Retrieves the Driver Categories that current user has access to
   * @returns - Array of Driver Categories
   */
  getDriverCategories(): Observable<DriverCategory[]> {
    return this.getUserOptions(SettingCategories.DriverCategory).pipe(
      map((resp) => resp.driverCategories)
    );
  }

  /**
   * Retrieves the latest user options for Trip Categories, Truck Categories and Driver Categories.
   * User options do depend on User Limitation or User access, in other words, user may not be able to
   * consume certain trip, truck or driver categories
   */
  getUserOptions(
    ...categories: (
      | SettingCategories.TripCategory
      | SettingCategories.TruckCategory
      | SettingCategories.DriverCategory
    )[]
  ): Observable<{
    tripCategories: TripCategory[];
    truckCategories: TruckCategory[];
    driverCategories: DriverCategory[];
  }> {
    if (!categories?.length) {
      categories = [
        SettingCategories.TripCategory,
        SettingCategories.TruckCategory,
        SettingCategories.DriverCategory
      ];
    }
    const commaSeparatedCategories = categories.join(',');
    const userOptions$ = this.http
      .get<ApiResponse<UserOptionDto[]>>(
        `${this.environment.apiUrl}/user/api/v1/user/useroptions/me?categories=${commaSeparatedCategories}`
      )
      .pipe(
        map((optionDtos) => {
          if (
            optionDtos?.status === ResponseStatus.Success &&
            optionDtos?.result?.length
          ) {
            return optionDtos?.result;
          } else {
            return [];
          }
        })
      );
    /*
    return forkJoin({
      categories: this.getSettingCategories(),
      userOptions: userOptions$
    }).pipe(
      map((resp) => {
        // The final object to be returned
        const result: {
          tripCategories: TripCategory[];
          truckCategories: TruckCategory[];
          driverCategories: DriverCategory[];
        } = {
          tripCategories: [],
          truckCategories: [],
          driverCategories: []
        };
        if (!resp?.categories?.length || !resp?.userOptions?.length) {
          return result;
        }
        resp.categories.forEach((category) => {
          if (category.settingCategory === SettingCategories.TripCategory) {
            const tripCat =
              resp.userOptions
                .filter(
                  (optionDto) => optionDto.settingCategoryId === category.id
                )
                .map((optionDto) => ({
                  tripCategoryId: optionDto.id,
                  tripCategoryName: optionDto.name,
                  isSelected: optionDto.isUserPreference
                })) || [];
            // Default sort by name ascending
            tripCat.sort((a, b) => {
              const aLessB = a.tripCategoryName < b.tripCategoryName;
              const aMoreB = a.tripCategoryName > b.tripCategoryName;
              return aLessB ? -1 : aMoreB ? 1 : 0;
            });
            result.tripCategories = tripCat;
          }
          if (category.settingCategory === SettingCategories.TruckCategory) {
            const truckCat =
              resp.userOptions
                .filter(
                  (optionDto) => optionDto.settingCategoryId === category.id
                )
                .map((optionDto) => ({
                  truckCategoryId: optionDto.id,
                  truckCategoryName: optionDto.name,
                  isSelected: optionDto.isUserPreference
                })) || [];
            // Default sort by name ascending
            truckCat.sort((a, b) => {
              const aLessB = a.truckCategoryName < b.truckCategoryName;
              const aMoreB = a.truckCategoryName > b.truckCategoryName;
              return aLessB ? -1 : aMoreB ? 1 : 0;
            });
            result.truckCategories = truckCat;
          }
          if (category.settingCategory === SettingCategories.DriverCategory) {
            const driverCat =
              resp.userOptions
                .filter(
                  (optionDto) => optionDto.settingCategoryId === category.id
                )
                .map((optionDto) => ({
                  driverCategoryId: optionDto.id,
                  driverCategoryName: optionDto.name,
                  isSelected: optionDto.isUserPreference
                })) || [];
            // Default sort by name ascending
            driverCat.sort((a, b) => {
              const aLessB = a.driverCategoryName < b.driverCategoryName;
              const aMoreB = a.driverCategoryName > b.driverCategoryName;
              return aLessB ? -1 : aMoreB ? 1 : 0;
            });
            result.driverCategories = driverCat;
          }
        });
        console.log(JSON.stringify(result));
        return result;
      })
    );*/
    return of(categoriesData);
  }

  /**
   * Retrieves the latest user settings for Terminals, Roles and Statuses.
   * User settings do not depend on User Limitation
   */
  getUserSettings(): Observable<UserSetting[]> {
    const userSettings$: Observable<UserSettingDto[]> = of([]);

    return forkJoin({
      // We need to get categories first, for example Terminal, Role, Trip Category, etc.
      // This is to know under what category the settings and options will fall into
      categories: this.getSettingCategories(),
      userSettings: userSettings$
    }).pipe(
      map((resp) => {
        // The final object to be returned
        const result: UserSetting[] = [];
        if (!resp?.categories?.length || !resp?.userSettings?.length) {
          return result;
        }
        resp.userSettings.forEach((settingDto) => {
          const foundCategory = resp?.categories.find(
            (category) => category.id === settingDto.settingCategoryId
          );
          if (foundCategory) {
            const newUserSetting: UserSetting = {
              settingCategory: foundCategory.settingCategory,
              settings: settingDto.settings
            };
            result.push(newUserSetting);
          }
        });
        return result;
      })
    );
  }

  /**
   * Updates the user settings values with the ones provided as argument
   * @param userSettingsToSave - The user settings to be saved
   */
  updateUserSettings(
    userSettingsToSave: UserSetting[]
  ): Observable<ApiResponse> {
    userSettingsToSave = userSettingsToSave || [];
    const categoriesObs = this.getSettingCategories();
    return categoriesObs.pipe(
      concatMap((categories) => {
        const settingsToSaveDto: UserSettingToSaveDto[] = [];
        userSettingsToSave.forEach((settingToSave) => {
          const foundCategory = categories.find(
            (category) =>
              category.settingCategory === settingToSave.settingCategory
          );
          if (foundCategory) {
            const newSettingDto: UserSettingToSaveDto = {
              settingCategoryId: foundCategory.id,
              settings: settingToSave.settings || []
            };
            settingsToSaveDto.push(newSettingDto);
          }
        });
        return this.http.put<ApiResponse>(
          `${this.environment.apiUrl}/user/api/v1/UserSettings/me`,
          settingsToSaveDto
        );
      })
    );
  }
}

/**
 * Name of the Actions that can be used to trace in the state history.
 */
enum UserSettingsStoreAction {
  GetSettingCategories = 'GetSettingCategories'
}

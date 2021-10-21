import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { UserAuthSettings } from '@shared/models/user-auth-settings.model';
import { StoreState } from '@shared/models/store-state.model';

/**
 * Provides state management for User Authentication Settings by using observable store.
 */
@Injectable({
  providedIn: 'root'
})
export class UserAuthSettingsService extends ObservableStore<StoreState> {
  // Keys to access every field from the storage
  private readonly storageKeys = {
    displayName: 'displayName',
    role: 'role',
    username: 'username'
  };

  // Default/initial values for every field (when they haven't been stored yet)
  private readonly defaultValues = {
    displayName: '',
    role: '',
    username: ''
  };

  constructor() {
    super({ trackStateHistory: true });
  }

  /**
   * Set Local Storage key its default value
   * @param key - Key field to be set
   */
  private setDefaultFieldToLocalStorage(key: string): void {
    if (!localStorage.getItem((this.storageKeys as any)[key])) {
      localStorage.setItem(
        (this.storageKeys as any)[key],
        (this.defaultValues as any)[key]
      );
    }
  }

  /**
   * Reads the given key from local storage and returns its string representation
   * @param key - Key of the field to be gotten
   * @returns The String value of the Local Storage Value
   */
  private getStringFieldFromLocalStorage(key: string): string {
    this.setDefaultFieldToLocalStorage(key);
    const stringValue = localStorage.getItem(key);
    return stringValue || '';
  }

  /**
   * Saves the given key into local storage assigning to it the given string value
   * @param key - Key of the field to be saved
   * @param value - Value to be saved for the field
   */
  private setStringFieldToLocalStorage(key: string, value: string): void {
    localStorage.setItem((this.storageKeys as any)[key], value);
  }

  /**
   * Retrieves the latest user authentication settings as they're stored in the repository
   * @returns - Latest user authentication settings from browser's local storage
   */
  private getSettingsFromRepository(): UserAuthSettings {
    const userAuthSettings: UserAuthSettings = {
      displayName: 'displayName',
      role: 'Role',
      username: 'username'
    };

    this.setState(
      { userAuthSettings },
      UserAuthSettingsStoreActions.GetUserAuthSettings
    );
    return userAuthSettings;
  }

  /**
   * Replaces the user's authentication settings that are currently stored in the repository
   * with the ones passed-in as the argument
   * @param newSettings - New settings to be saved
   * @returns - Latest settings from the repository
   */
  updateSettings(newSettings: UserAuthSettings): UserAuthSettings {
    this.setStringFieldToLocalStorage(
      this.storageKeys.displayName,
      newSettings.displayName
    );
    this.setStringFieldToLocalStorage(this.storageKeys.role, newSettings.role);
    this.setStringFieldToLocalStorage(
      this.storageKeys.username,
      newSettings.username
    );
    return this.getSettingsFromRepository();
  }

  /**
   * Retrieves the user's authentication settings from the store
   * @returns - User's authentication settings (coming either from the reposiory or cache)
   */
  getSettings(): UserAuthSettings {
    const state = this.getState();
    if (state && state.userAuthSettings) {
      return state.userAuthSettings;
    } else {
      return this.getSettingsFromRepository();
    }
  }

  /**
   * Clears all user's authentication settings from our repository and from the store
   */
  clearSettings(): void {
    for (const key of Object.keys(this.storageKeys)) {
      localStorage.removeItem(key);
    }
    const userAuthSettings: UserAuthSettings = {
      displayName: this.defaultValues.displayName,
      role: this.defaultValues.role,
      username: this.defaultValues.username
    };
    this.setState(
      { userAuthSettings },
      UserAuthSettingsStoreActions.ClearUserAuthSettings
    );
  }
}

/**
 * Name of the Actions that can be used to trace in the state history.
 */
export enum UserAuthSettingsStoreActions {
  GetUserAuthSettings = 'GetUserAuthSettings',
  ClearUserAuthSettings = 'ClearUserAuthSettings'
}

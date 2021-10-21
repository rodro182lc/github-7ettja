import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  private readonly STORAGE_KEY_PREFIX = 'userPrefV3.';
  private readonly MESSAGE_BOARD_STATE_KEY = 'message-board-state';

  /**
   * Persists grid's state into browser's local storage
   * @param gridId - The identifier of the grid to persist
   * @param serializedState  - The raw JSON state of the grid
   */
  saveGridState(gridId: string, serializedState: string) {
    localStorage.setItem(
      `${this.STORAGE_KEY_PREFIX}${gridId}`,
      serializedState
    );
  }

  /**
   * Retrieves the state of the given grid id
   * @param gridId - The identifier of the requested grid
   * @returns - Raw JSON state of the grid
   */
  getGridState(gridId: string): string | null {
    return localStorage.getItem(`${this.STORAGE_KEY_PREFIX}${gridId}`);
  }

  /**
   * Persists the message board's open/closed state into browser's local storage
   * @param isShown - True if shown by default, otherwise false
   */
  saveMessageBoardState(isShown: boolean): void {
    localStorage.setItem(
      `${this.STORAGE_KEY_PREFIX}${this.MESSAGE_BOARD_STATE_KEY}`,
      String(isShown)
    );
  }

  /**
   * Retrieves the open/closed state of the message board
   * @returns - True if shown by default, otherwise false
   */
  getMessageBoardState(): boolean {
    const strValue = localStorage.getItem(
      `${this.STORAGE_KEY_PREFIX}${this.MESSAGE_BOARD_STATE_KEY}`
    );
    return strValue?.toLocaleLowerCase() === 'true';
  }
}

import { localStoragePartyKey } from "../constants";

export function getPartyFromLocalStorage(): string[][] {
  var localStorageParitesString = localStorage.getItem(localStoragePartyKey);
  if (!!localStorageParitesString) {
    try {
      return JSON.parse(localStorageParitesString) as string[][];
    } catch {
      return [];
    }
  } else {
    return [];
  }
}

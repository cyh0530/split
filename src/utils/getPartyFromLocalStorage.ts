import { localStoragePartyKey } from "../constants";

export function getPartyFromLocalStorage(): string[][] {
 if (typeof window === "undefined") {
      return [];
    }
    try {
      const item = window.localStorage.getItem(localStoragePartyKey);
      return item ? JSON.parse(item) : [];
    } catch (err) {
      console.error(err);
      return [];
    }
}

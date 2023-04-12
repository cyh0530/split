import { localStoragePartyKey } from "../constants";

export function setPartyToLocalStorage(parties: string[][]) {
  localStorage.setItem(localStoragePartyKey, JSON.stringify(parties));
}

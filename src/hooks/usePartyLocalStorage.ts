import { useState } from "react";
import { localStoragePartyKey } from "../constants";
import { getPartyFromLocalStorage } from "../utils";

export function usePartyLocalStorage(): [string[][],  (newParty: string[][]) => void] {
  const [party, setParty] = useState<string[][]>(getPartyFromLocalStorage);
  
  const setPartyWithLocalStorage = (newParty: string[][]) => {
    setParty(newParty)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(localStoragePartyKey, JSON.stringify(newParty));
    }
  }
  
  return [party, setPartyWithLocalStorage];
}

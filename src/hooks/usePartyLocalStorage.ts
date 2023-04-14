import { useState } from "react";
import { localStoragePartyKey } from "../constants";

export function usePartyLocalStorage(): [string[][],  (newParty: string[][]) => void] {
  const [party, setParty] = useState<string[][]>(() => {
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
  });
  
  const setPartyWithLocalStorage = (newParty: string[][]) => {
    setParty(newParty)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(localStoragePartyKey, JSON.stringify(newParty));
    }
  }
  return [party, setPartyWithLocalStorage];
}

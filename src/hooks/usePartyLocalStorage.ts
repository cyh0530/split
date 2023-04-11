import { useEffect, useState } from "react";
import { getPartyFromLocalStorage } from "../utils/getPartyFromLocalStorage";

export function usePartyLocalStorage() {
  const [party, setParty] = useState<string[][]>([]);
  useEffect(() => {
    window.addEventListener("storage", () => {
      setParty(getPartyFromLocalStorage());
    });
  }, []);
  return party;
}

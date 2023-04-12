import { List } from "@mui/material";
import { SplitCheck } from "../../models/splitCheck";
import { ScanResultItem } from "./ScanResultItem";

interface ScanResultProps {
  splitCheck: SplitCheck[];
}
export function ScanResult({ splitCheck }: ScanResultProps) {
  return (
    <>
      <List>
        {splitCheck.map((user) => (
          <ScanResultItem key={user.name} user={user} />
        ))}
      </List>
    </>
  );
}

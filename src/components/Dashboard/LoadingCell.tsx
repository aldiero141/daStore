import { TableCell } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export default function LoadingCell() {
  return (
    <>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
    </>
  );
}

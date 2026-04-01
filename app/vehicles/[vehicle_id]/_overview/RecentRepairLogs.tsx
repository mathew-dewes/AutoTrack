import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RecentRepairLogType } from "@/lib/validation/types"
import { format } from "date-fns"

export function RecentRepairLogs({repairLogs}:
  {repairLogs: RecentRepairLogType[]}
) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead className="text-right">Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {repairLogs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-medium">{format(log.date, "dd/MM/yy")}</TableCell>
            <TableCell>{log.repair_type}</TableCell>
            <TableCell>{log.vendor}</TableCell>
            <TableCell className="text-right">{log.cost}</TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  )
}

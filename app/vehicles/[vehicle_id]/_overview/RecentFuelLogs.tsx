import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { convertToMoney } from "@/lib/utils"
import { RecentFuelLogType } from "@/lib/validation/types"
import { format } from "date-fns"


export function RecentFuelLogs({fuelLogs}:
  {fuelLogs:RecentFuelLogType[]}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Date</TableHead>
          <TableHead>Litres</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead className="text-right">Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fuelLogs?.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-medium">{format(log.date, "dd/MM/yy") }</TableCell>
            <TableCell>{log.litres}</TableCell>
            <TableCell>{log.vendor}</TableCell>
            <TableCell className="text-right">{convertToMoney(Number(log.cost))}</TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  )
}

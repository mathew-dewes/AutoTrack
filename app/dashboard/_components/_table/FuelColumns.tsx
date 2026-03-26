"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import {  FuelEntryAll } from "@/lib/validation/types"
import { format } from "date-fns"



export const fuelColumns: ColumnDef<FuelEntryAll>[] = [
    
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {

      return <div>{format(row.original.date, "dd/MM/yy")}</div>
    },
  },
{
  id: "model",
  accessorFn: (row) => row.vehicles.model,
  header: "Vehicle",
  cell:({row})=>{
    const rego = row.original.vehicles.licence_plate_number;
    const model = row.original.vehicles.model
    return <p>{`${model} - ${rego}`}</p>

  }
},
  {
    accessorKey: "vendor",
    header: "Station",
  },

  {
    accessorKey: "fuel_litres",
    header: "Litres",
  },
  {
    accessorKey: "cost",
      header: () => <div className="text-right">Total cost</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },

    {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
    
    
  
]
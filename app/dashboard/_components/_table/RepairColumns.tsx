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
import { RepairEntryAll } from "@/lib/validation/types"
import { format } from "date-fns"



export const repairColumns: ColumnDef<RepairEntryAll>[] = [
    
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {

      return <div>{format(row.original.date, "dd/MM/yy")}</div>
    },
  },

  {
  id: "make",
  accessorKey: "make",  
  header: "Vehicle",
  cell:({row})=>{
     const { make, model, licence_plate_number: rego } = row.original;
      return <p>{`${make} ${model} - ${rego}`}</p>;

  }
},
{
  id: "service_type",
  accessorFn: (row) => row.type,
  header: "Repair type",

},
  {
    accessorKey: "vendor",
    header: "Vendor",
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
    cell: () => {

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
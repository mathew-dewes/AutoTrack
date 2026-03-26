"use client"

import { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { FuelEntry } from "@/lib/validation/types"



export const Fuelcolumns: ColumnDef<FuelEntry>[] = [

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {

      return <div>{format(row.original.date, "dd/MM/yy")}</div>
    },
  },
  {
    accessorKey: "fuel_litres",
    header: "Litres filled",
  },
  {
    accessorKey: "cost_per_litre",
    header: "Cost per litre",
    cell:({row})=>{
        const amount = parseFloat(row.getValue("cost_per_litre"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

       return <div>{formatted}</div>
    }
  },

    {
    accessorKey: "vendor",
    header: "Vendor",
  },
  {
    accessorKey: "odometer",
    header: "Odometer (KM)",
  },

  {
    accessorKey: "notes",
    header: "Notes",
  },
  // {
  //   accessorKey: "email",
  //    header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
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
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
import { NotificationEntry } from "@/lib/validation/types"



export const ReminderColumns: ColumnDef<NotificationEntry>[] = [

  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {

      return <div>{format(row.original.created_at, "dd/MM/yy")}</div>
    },
  },
  {
    accessorKey: "date_trigger",
    header: "Reminder date",
    cell: ({ row }) => {

      return <div>
        {row.original.date_trigger ? 
        format(row.original.date_trigger, "dd/MM/yy") : "-"}</div>
    },
  },

    {
    accessorKey: "odometer_trigger",
    header: "ODO trigger (KM)",
  },
    {
    accessorKey: "title",
    header: "Repair title",
  },
    {
    accessorKey: "sent",
    header: "Email sent",
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
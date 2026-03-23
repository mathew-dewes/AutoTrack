"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react";

type Props = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
};

export function LogDatePicker({value, onChange}: Props) {

    const [open, setOpen] = React.useState(false) // track popover state


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="max-w-48 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {value ? format(value, "PPP") : <span>Pick a date</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ?? undefined}       // controlled value
          onSelect={(date) =>{
            onChange(date)
            setOpen(false)
          }} // pass date back to RHF
          defaultMonth={value ?? new Date()} 
        />
      </PopoverContent>
    </Popover>
  )
}

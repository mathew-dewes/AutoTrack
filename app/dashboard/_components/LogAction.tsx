import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Vehicle } from "@/lib/validation/types"
import Link from "next/link"

export function LogAction({vehicles, type}:{
  vehicles:Vehicle[], type: "fuel" | "repair"
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">+ Log <span className="capitalize">{type}</span></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
        
          <DropdownMenuLabel>Vehicles</DropdownMenuLabel>
            {vehicles.map((vehicle)=>{
            return <DropdownMenuItem asChild key={vehicle.id}>
              <Link href={`/vehicles/${vehicle.id}/${type}/log`}>{vehicle.make} {vehicle.model}</Link>
              </DropdownMenuItem>
          })}
      
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Service_type } from "@/lib/validation/enums";


type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export default function LogServiceSelector({value, onChange}: Props){
    return (
        <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a service type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Service types</SelectLabel>
          {Service_type.map((type)=>{
            return <SelectItem key={type} value={type}>{type}</SelectItem>
          })}
 
        </SelectGroup>
      </SelectContent>
    </Select>
    )
}
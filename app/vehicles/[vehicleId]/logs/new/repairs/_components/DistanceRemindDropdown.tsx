import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { distance_options } from "@/lib/utils";

type Props = {
    value?: string;
    onChange: (value: string) => void;
};

export default function DistanceReminderDropdown({ value, onChange }: Props) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a distance" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Distances</SelectLabel>
                    {distance_options.map((distance) => {
                        return <SelectItem
                            key={distance.label}
                            value={distance.value.toString()}>{distance.label}</SelectItem>
                    })}
                    <SelectItem value="custom">Custom</SelectItem>

                </SelectGroup>
            </SelectContent>


        </Select>
    )
}
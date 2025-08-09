"use client"

import { LogService } from "@/utlis/actions/logActions";
import { useVehicles } from "@/utlis/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export interface ServiceEntry { km: number, vehicle_id: string, notes: string, type: ServiceType, date: string };
export type ServiceType = "WOF" | "Rego" | "RUC" | "Repair"



export default function LogServiceForm() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { data: vehicles, isLoading, isError } = useVehicles()

    const mutation = useMutation({
        mutationFn: (data: ServiceEntry) => LogService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["service"] }).
                then(() => {
                    router.push("/log");
                });


        },
    });

    if (isLoading) return <p>Loading vehicles...</p>
    if (isError) return <p className="text-red-500">Failed to load vehicles</p>

    return (
        <form className="mt-10"
            onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const vehicle_id = form.vehicle_id.value
                const notes = form.notes.value
                const service = form.service.value
                const date = form.date.value;
                const km = form.km.value


                mutation.mutate({ vehicle_id, notes, type: service, date, km })
            }}

        >
            <div className="flex gap-10">
                <select className="border p-2 rounded" name="vehicle_id" required>
                    <option value="">Select your vehicle</option>
                    {vehicles?.map((v) => (
                        <option key={v.id} value={v.id}>
                            {v.make} {v.model}
                        </option>
                    ))}
                </select>
                <select className="border p-2 rounded" name="service" required>
                    <option>Select service type</option>

                    <option value={"WOF"}>
                        WOF
                    </option>
                    <option value={"Rego"}>
                        REGO
                    </option>
                    <option value={"RUC"}>
                        RUC (Road user chargers)
                    </option>
                    <option value={"Repair"}>
                        Repairs
                    </option>

                </select>

            </div>
            <div className="mt-10">
                <label className="block font-semibold">Kilometers at time of repair:</label>
                <input name="km" type="text" className="border indent-2 rounded p-2 mt-2" placeholder="Current Km's" />
            </div>

            <div className="flex gap-5 items-center mt-10">
                <label className="font-semibold">Date of service:</label>
                <input className="border p-2 rounded" type="date" name="date" />
            </div>
            <div className="mt-10">
                <label className="font-semibold block">Notes:</label>
                <textarea rows={8} cols={60} className="border rounded mt-2 indent-2" name="notes"></textarea>
            </div>



            <div>
                <button className="border mt-10 p-2 rounded" type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Adding..." : "Log service"}
                </button>

                {mutation.isError && (
                    <p className="text-red-500">{(mutation.error as Error).message}</p>
                )}
                {mutation.isSuccess && <p className="text-green-500">Added!</p>}
            </div>

        </form>
    )
}

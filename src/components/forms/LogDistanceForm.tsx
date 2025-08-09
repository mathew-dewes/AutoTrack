"use client"

import { LogDistance } from "@/utlis/actions/logDistanceAction";
import { useVehicles } from "@/utlis/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";



export default function LogDistanceForm() {
  const queryClient = useQueryClient();
    const router = useRouter();
    const { data: vehicles, isLoading, isError } = useVehicles()

  const mutation = useMutation({
    mutationFn: (data: { km: number, vehicle_id: string }) => LogDistance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["distance"] }).
      then(()=>{
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
        const km = Number(form.km.value)
        const vehicle_id = form.vehicle_id.value
        mutation.mutate({ km, vehicle_id })
      }}
      
    >
          <select name="vehicle_id" required>
        <option value="">Select your vehicle</option>
        {vehicles?.map((v) => (
          <option key={v.id} value={v.id}>
            {v.make} {v.model}
          </option>
        ))}
      </select>
      <input type="number" name="km" placeholder="Distance" />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Adding..." : "Log distance"}
      </button>

      {mutation.isError && (
        <p className="text-red-500">{(mutation.error as Error).message}</p>
      )}
      {mutation.isSuccess && <p className="text-green-500">Added!</p>}
    </form>
  )
}

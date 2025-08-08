"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { addvehicle } from "@/utlis/db/vehicles"
import { useAuth } from "../providers/AuthProvider"



type VehicleForm = {
  make: string
  model: string
  year: number | string
  odometer: number | string,
  user_id: string | null
}

export default function AddVehicleForm() {
  const queryClient = useQueryClient()
  const router = useRouter();
  const {user_id} = useAuth()

  const [form, setForm] = useState<VehicleForm>({
    make: "",
    model: "",
    year: "",
    odometer: "",
    user_id: user_id
  })

  const {mutate, isError, isPending, error} = useMutation({
    mutationFn: async(newVehicle: VehicleForm)=> await addvehicle(newVehicle),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['vehicles']}) // refetch vehicle list
      router.push("/vehicles")

    }
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutate(form);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-5">
      <label>Make</label>
      <input name="make" value={form.make} onChange={handleChange} placeholder="Make" className="border p-1 rounded w-1/4" />
      <label>Model</label>
      <input name="model" value={form.model} onChange={handleChange} placeholder="Model" className="border p-1 rounded w-1/4" />
      <label>Year</label>
      <input name="year" value={form.year} onChange={handleChange} placeholder="Year" type="number" className="border p-1 rounded w-1/4" />
      <label>Odometer</label>
      <input name="odometer" value={form.odometer} onChange={handleChange} placeholder="Odometer" className="border p-1 rounded w-1/4" />
      <button type="submit" disabled={isPending} className="border p-2 rounded mt-2">
        {isPending ? "Adding..." : "Add vehicle"}
      </button>
      {isError && <p className="text-red-500">Error: {(error as Error).message}</p>}
    </form>
  )
}

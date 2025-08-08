"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { addvehicle } from "@/utlis/db/vehicles"
// import { useAuth } from "../providers/AuthProvider"



type VehicleForm = {
  make: string
  model: string
  year: number | string
  odometer: number | string,
}

export default function AddVehicleForm() {
  const queryClient = useQueryClient()
  const router = useRouter();
  // const {user_id} = useAuth()
   const [formError, setFormError] = useState<string | null>(null);

  const [form, setForm] = useState<VehicleForm>({
    make: "",
    model: "",
    year: "",
    odometer: ""
  })

  const {mutate, isPending } = useMutation({
    mutationFn: async(newVehicle: VehicleForm)=> await addvehicle(newVehicle),
     onError: (error: Error) => {
      setFormError(error.message); // This is your DB constraint error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['vehicles']});
        setFormError(null);
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
      <input required name="make" value={form.make} onChange={handleChange} placeholder="Make" className="border p-1 rounded w-1/4" />
      <label>Model</label>
      <input required name="model" value={form.model} onChange={handleChange} placeholder="Model" className="border p-1 rounded w-1/4" />
      <label>Year</label>
      <input required name="year" value={form.year} onChange={handleChange} placeholder="Year" type="number" className="border p-1 rounded w-1/4" />
      <label>Odometer</label>
      <input required name="odometer" value={form.odometer} onChange={handleChange} placeholder="Odometer" className="border p-1 rounded w-1/4" />
      <button type="submit" disabled={isPending} className="border p-2 rounded mt-2">
        {isPending ? "Adding..." : "Add vehicle"}
      </button>
{formError && <p className="text-red-500">Error: {formError}</p>}
    </form>
  )
}

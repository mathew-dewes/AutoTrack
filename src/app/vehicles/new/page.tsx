"use client"

import { addvehicle } from "@/utlis/actions/vehicles"
import { useActionState } from "react"

export default function Page() {
    const initalState = {
        formFields: {
            make: "",
            model: "",
            year: "",
            odometer: ""
        },
        error: ""
    }

    const [state, formAction, isPending] = useActionState(addvehicle, initalState);

    const { error, formFields: {
        make,
        model,
        year,
        odometer
    } } = state;
    return (
        <div>
            <h1>Add new vehicle</h1>
            <form className="flex flex-col gap-2 mt-5" action={formAction}>
                <label>Make</label>
                <input className="border w-1/4 rounded p-1" type="text" placeholder="Make" name="make" defaultValue={make ?? ""} />
                <label>Model</label>
                <input className="border w-1/4 rounded p-1" type="text" placeholder="Model" name="model" defaultValue={model ?? ""} />
                <label>Year</label>
                <input className="border w-1/4 rounded p-1" type="number" placeholder="year" name="year" defaultValue={year ?? ""} />
                <label>Odometer</label>
                <input className="border w-1/4 rounded p-1" type="text" placeholder="Odometer (Km's)" name="odometer" defaultValue={odometer ?? ""} />
                <button className="border p-2 rounded mt-2" disabled={isPending} type="submit">
                    {isPending ? "Creating" : "Add vehicle"}
                </button>
                {error && <p>Error: {error}</p>}
            </form>

        </div>
    )
}
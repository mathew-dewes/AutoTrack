

type Vehicle = {
    id?: string
    created_at?: string
    make: string
    model: string
    year: number | string
    odometer: number | string
}
export async function fetchVehicles(): Promise<Vehicle[]> {
    const res = await fetch('/api/vehicles')
    if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || 'Failed to fetch vehicles')
    }
    return res.json()
}

export async function addvehicle(newVehicle: Vehicle){
  const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVehicle)
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to add vehicle')
      }
      return res.json()
}
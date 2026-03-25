import { fuelColumns, Payment } from "./FuelColumns"
import { FuelTableClient } from "./FuelTableClient"


async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function FuelTable() {
  const data = await getData()

  return (
    <div>
      <FuelTableClient columns={fuelColumns} data={data} />
    </div>
  )
}
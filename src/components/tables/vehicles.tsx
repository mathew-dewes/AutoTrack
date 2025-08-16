import { prisma } from "@/lib/db";



export default async function VehiclesTable({limit}:{limit?: number}) {

const vehicles = await prisma.vehicle.findMany({
  where:{
    userId: "cmedrw5ly0000uhfgosukjm4x"
  }
})


  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Vehicle</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Odometer</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Health rating %</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Next service / Repair</th>

            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
   
        {vehicles?.slice(0, limit).map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 whitespace-nowrap">{vehicle.make} {vehicle.model}</td>
              <td className="px-4 py-3">
                <span

                >
                  {vehicle.odometer} Km
                </span>
              </td>
              <td className="px-4 py-3">22</td>
              <td className="px-4 py-3"> TBC</td>
              <td className="px-4 py-3 text-right">


                <a
                  href={`/vehicles/${vehicle.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
    
  
        </tbody>
      </table>
    </div>
  );
}

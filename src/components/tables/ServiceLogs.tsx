import { prisma } from "@/lib/db";








export default async function ServiceLogsTable() {

  const logs = await prisma.serviceLogs.findMany({
    where: {
      userId: "cmedrw5ly0000uhfgosukjm4x"
    },
    include:{
      vehicle: true
    }
  })

  



  return (
   <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Vehicle</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Service type</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Merchant</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Notes</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Odometer (Km)</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Renewal</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Cost</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {logs?.map((log) => (
          
            <tr key={log.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 whitespace-nowrap">{log.date.toISOString()}</td>
                    <td className="px-4 py-3">{log.vehicle?.make}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800`}
                >
                  {log.type}
                </span>
              </td>
              <td className="px-4 py-3">{log.machanic}</td>
              <td className="px-4 py-3">{log.notes}</td>
              <td className="px-4 py-3">{log.odometer}</td>
              <td className="px-4 py-3">12000km</td>
                     
              <td className="px-4 py-3">${log.cost}</td>
              <td className="px-4 py-3 text-right">
                
                 
                <a
                  href={`/log/services/${log.id}`}
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

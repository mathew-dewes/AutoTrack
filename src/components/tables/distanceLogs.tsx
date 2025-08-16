import { distance_logs } from "@/utils/data";







export default async function DistanceLogsTable({limit}:{limit?: number}) {




  return (
   <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Vehicle</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Logged Distance</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Change</th>

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {distance_logs?.slice(0, limit).map((log) => (
            <tr key={log.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 whitespace-nowrap">{log.logged_at}</td>
              <td className="px-4 py-3">
                <span

                >
                  {log.vehicle_name}
                </span>
              </td>
              <td className="px-4 py-3">114432 Km</td>
              <td className="px-4 py-3">1200km</td>
         
                    
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

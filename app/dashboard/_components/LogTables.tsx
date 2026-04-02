'use client'


import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { FuelTableClient } from './_table/FuelTableClient'
import { RepairTableClient } from './_table/RepairTableClient'
import { fuelColumns } from './_table/FuelColumns'
import { repairColumns } from './_table/RepairColumns'
import { AllLogs } from '@/lib/validation/types'
import { useQuery } from '@tanstack/react-query'
import LoadingCard from '@/components/web/LoadingCard'
import NullCard from '@/components/web/NullCard'

async function fetchLogs():Promise<AllLogs> {
    const res = await fetch(`/api/dashboard/logs`);
    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }



    return res.json();
}


export function LogTables() {
  const [activeTable, setActiveTable] = useState<'fuel' | 'repairs'>('fuel')
    const { data: metrics, error, isLoading, isError } =
        useQuery({
            queryKey: [`dashboard-logs`],
            queryFn: () => fetchLogs(),
            staleTime: 1000 * 30,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard />
    if (isError) return <p>There was an error</p>
    if (!metrics) return <NullCard title="Fleet Summary" description="You have no fuel logs. Please add them to see metrics" />

  
    return (
    <div className="space-y-4 col-span-1">
      <div className="flex gap-2">
        <Button 
        variant={`${activeTable == "fuel" ? "default" : "outline"}`}
        onClick={() => setActiveTable('fuel')}
        >
            Fuel
        </Button>
        <Button 
        variant={`${activeTable == "repairs" ? "default" : "outline"}`}
        onClick={() => setActiveTable('repairs')}
        >
            Repairs
        </Button>

        
      </div>

      {/* Tables */}
      <div className='h-110'>
        {activeTable === 'fuel' ?
        <FuelTableClient columns={fuelColumns} data={metrics.fuel_logs} />: 
        <RepairTableClient columns={repairColumns} data={metrics.repair_logs}/>}
      </div>
    </div>
  )
}
'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

import { RecentRepairLogs } from './RecentRepairLogs'
import { RecentFuelLogs } from './RecentFuelLogs'
import { RecentFuelLogType, RecentRepairLogType } from '@/lib/validation/types'


export function RecentTableSwitcher({fuelLogs, repairLogs}:
  {fuelLogs:RecentFuelLogType[], repairLogs: RecentRepairLogType[]}
) {
  const [activeTable, setActiveTable] = useState<'fuel' | 'repairs'>('fuel')

  return (
    <div>
      <div className="flex gap-2">
        <Button size={"sm"} 
        variant={`${activeTable == "fuel" ? "default" : "outline"}`}
        onClick={() => setActiveTable('fuel')}
        >
            Fuel
        </Button>
        <Button size={"sm"} 
        variant={`${activeTable == "repairs" ? "default" : "outline"}`}
        onClick={() => setActiveTable('repairs')}
        >
            Repairs
        </Button>

        
      </div>

      <div>
        {activeTable === 'fuel' ?
        <RecentFuelLogs fuelLogs={fuelLogs}/>: 
        <RecentRepairLogs repairLogs={repairLogs}/>}
      </div>
    </div>
  )
}
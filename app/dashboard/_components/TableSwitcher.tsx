'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { fuelColumns } from './_table/FuelColumns'
import { FuelTableClient } from './_table/FuelTableClient'
import { FuelEntryAll, RepairEntryAll } from '@/lib/validation/types'
import { RepairTableClient } from './_table/RepairTableClient'
import { repairColumns } from './_table/RepairColumns'


export function TableSwitcher({fuel, repairs}:{fuel: FuelEntryAll[], repairs: RepairEntryAll[]}) {
  const [activeTable, setActiveTable] = useState<'fuel' | 'repairs'>('fuel')

  return (
    <div className="space-y-4">
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
      <div>
        {activeTable === 'fuel' ?
        <FuelTableClient columns={fuelColumns} data={fuel} />: 
        <RepairTableClient columns={repairColumns} data={repairs}/>}
      </div>
    </div>
  )
}
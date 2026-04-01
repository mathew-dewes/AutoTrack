
export type Vehicle = {
  avg_km_per_litre: string,
  current_odometer: number,
  id: string,
  last_litres: string,
  make: string,
  model: string,
  total_distance: string,
  total_litres: string,
  year: number,
  avg_weekly_distance: string,
  avg_weekly_cost: string,
  licence_plate_number: string
};

export type FuelEntry = {
  id: string;
  date: string;
  fuel_litres: number | null;
  cost_per_litre: number | null;
  notes: string | null;
  cost: number;
  odometer: number;
  vendor: string;


};


export type RecentActivityType = {
  id: string,
  vehicle_id: string,
  date: Date,
  litres: string | null,
  type: "fuel" | "repair",
  cost: string,
  vendor: string,
  repair_type: string
};


export type RecentFuelLogType = {
  id: string,
  date: Date,
  cost: string,
  litres: string | null,
  vendor: string
}
export type RecentRepairLogType = {
  id: string,
  date: Date,
  cost: string,
  litres: string | null,
  vendor: string,
  repair_type: string
};


export type FleetSummaryType = {
  total_distance: string,
  total_fuel_spend: string,
  total_repair_spend: string,
  total_vehicles: string
};


export type EfficienciesType = {

  most_efficient: {
    id: string,
    make: string,
    model: string,
    fuel_cost: number,
    total_litres: number,
    distance: number,
    km_per_litre: number,
    licence_plate_number: string
  },

  least_efficient: {
    id: string,
    make: string,
    model: string,
    fuel_cost: number,
    total_litres: number,
    distance: number,
    km_per_litre: number,
    licence_plate_number: string
  }

};


export type AllLogs = {
  fuel_logs:FuelEntryAll[],
  repair_logs:RepairEntryAll[]
}


export type FuelEntryAll = {
date: string,
make: string,
vendor: string,
model: string,
litres: number,
cost: number,
licence_plate_number: string


}


export type RepairEntryAll = {
date: string,
make: string,
type: string,
vendor: string,
model: string,
litres: number,
cost: number,
licence_plate_number: string
};
export type Vehicle = {
    current_fuel_average: string,
    current_odometer: number,
    id: string,
    initial_odometer: number,
    last_fill_date: Date,
    last_litres: string,
    make: string,
    model:string,
    overall_fuel_average: string,
    total_distance: string,
    total_litres: string,
    year: number,
    last_cost: string
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

export type RepairEntry = {
  id: string
  date: string;
  notes: string;
  cost: number;
  odometer: number;
  service_type: ['oil_service',
'general_service',
'brakes',
'tyres',
'battery'];
};
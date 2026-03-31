export type Vehicle = {
    avg_km_per_litre: string,
    current_odometer: number,
    id: string,
    last_litres: string,
    make: string,
    model:string,
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

export type RepairEntry = {
  id: string
  date: string;
  notes: string;
  cost: number;
  service_type: ['oil_service',
'general_service',
'brakes',
'tyres',
'battery'];
};
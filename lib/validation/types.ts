export type Vehicle = {
    id: string,
    make: string,
    model: string,
    year: number,
    licence_plate_number: number,
    current_odometer: number,
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
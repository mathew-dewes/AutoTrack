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
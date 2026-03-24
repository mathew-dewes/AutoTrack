export type Vehicle = {
    make: string;
    model: string;
    year: number;
    licence_plate_number: string;
    current_odometer: number;
};

export type FuelEntry = {
  id: string;
  date: string;
  fuel_litres: number | null;
  cost_per_litre: number | null;
  notes: string | null;
  cost: number;
  odometer: number;


};

export type RepairEntry = {
  id: string
  date: string;
  title: string;
  notes: string;
  cost: number;
  odometer: number
}
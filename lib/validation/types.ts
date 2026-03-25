export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  current_odometer: number;
  licence_plate_number: string;
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
};


export type NotificationEntry = {
  id: string;
  created_at: string;
  title: string;
  date_trigger: string;
  odometer_trigger: number | null;
  sent: boolean | null;
}
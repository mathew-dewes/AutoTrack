import { ServiceType } from "./enums";

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
  vendor: string;


};


export type FuelEntryAll = {
  id: string;
  date: string;
  fuel_litres: number | null;
  vendor: string | null;
  cost: number;
  vehicles: {
    model: string;
    licence_plate_number: string;
  };

}

export type RepairEntry = {
  id: string
  date: string;
  notes: string;
  cost: number;
  odometer: number;
  service_type: ServiceType;
};

export type RepairEntryAll = {
id: string;
    date: string;
    cost: number;
    odometer: number;
    service_type: ServiceType;
    vendor: string | null;
      vehicles: {
    model: string;
    licence_plate_number: string;
  };
};


export type NotificationEntry = {
  id: string;
  created_at: string;
  date_trigger: string;
  odometer_trigger: number | null;
  sent: boolean | null;
  type: ServiceType
}

export type MonthlySpend = {
    month: string;
    spend: number;
};


export type TopVehicle = {
    licence_plate: string;
    make: string;
    model: string;
    total_spend: number;
  }
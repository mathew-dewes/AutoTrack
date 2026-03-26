import { Database } from "../supabase/types";

export const Service_type = ["oil_change", "brakes", "tyres", "WOF", "other"];
export const Log_type = ["maintenance", "fuel"];

export type ServiceType = Database["public"]["Enums"]["Service_type"];
export type LogType = Database["public"]["Enums"]["Log_type"];

export type Distances = ["1000", "2000", "5000", "10000"]
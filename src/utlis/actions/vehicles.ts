"use server";

import { redirect } from "next/navigation";
import { createClientForServer } from "../supabase/server";

export const addvehicle = async (
  prevState: {
    error: string;
    formFields: {
      make: FormDataEntryValue | null;
      model: FormDataEntryValue | null;
      year: FormDataEntryValue | null;
      odometer: FormDataEntryValue | null;
    };
  },
  formData: FormData
) => {
  const supabase = await createClientForServer();
  const session = await supabase.auth.getUser();
  const user_id = session.data.user?.id;

  const make = formData.get("make") as string | null;
  const model = formData.get("model") as string | null;
  const yearRaw = formData.get("year") as string | null;
  const odometerRaw = formData.get("odometer") as string | null;

  const year = yearRaw ? Number(yearRaw) : null;
  const odometer = odometerRaw ? Number(odometerRaw) : null;

  const { data, error } = await supabase
    .from("vehicles")
    .insert({ make, model, year, odometer, user_id })
    .select()
    .single();

  if (error) {
    return {
      error: error.message,
      formFields: { make, model, year: yearRaw, odometer: odometerRaw },
    };
  }
  console.log(data);
  

  redirect("/vehicles");
};

import z from "zod";
import { Service_type } from "./enums";

const date = new Date();

const currentYear = date.getFullYear();

export const loginFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be 8 characters or more')
});

export const registerFormSchema = z.object({
  firstName: z.string()
    .min(3, 'First name must be 3 or more characters')
    .max(20, 'First name must be less than 20 characters'),
  lastName: z.string()
    .min(3, 'Last name must be 3 or more characters')
    .max(20, 'Last name must be less than 20 characters'),
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be 8 characters or more'),
  confirmPassword: z.string()
});


export const vehicleSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number('Model year is required')
    .min(1900, "The model year you selected is too far in the past")
    .max(currentYear, 'Please select a model year from the present or past'),
  licence_plate: z.string().min(4).max(6),
  odometer: z.number("Odometer reading is required").min(1).max(1000000)
});

export const fuelLogSchema = z.object({
  date: z.date('Refuel date is required'),
  odometer: z.number("Odometer reading is required").min(1).max(1000000),
  cost: z.number("Cost is required"),
  fuel_litres: z.number("Litres of fuel is required"),
  notes: z.string().optional()
});

export const repairFormSchema = z.object({
  title: z.string().min(1, "Repair title is required"),
  notes: z.string().max(200, 'Description must be 200 characters or less').optional(),
  date: z.date('Refuel date is required'),
  odometer: z.number("Odometer reading is required").min(1).max(1000000),
  cost: z.number("Cost is required"),
  service_type: z.enum(Service_type, "Please select a service type"),

  // Reminder logic
  enable_reminders: z.boolean(),
  reminder_date: z.date().optional(),
  odometer_trigger: z.number("Please enter a valid number").optional()
}).superRefine((data, ctx)=>{
  if (!data.enable_reminders) return

  if (!data.reminder_date && !data.odometer_trigger){
        ctx.addIssue({
      code: "custom",
      message: "Provide at least a date or distance",
      path: ["reminder_date"],
    })

    ctx.addIssue({
  code: "custom",
  message: "Provide at least a date or distance",
  path: ["odometer_trigger"],
});
  }

    if (
    data.odometer_trigger !== undefined &&
    data.odometer !== undefined &&
    data.odometer_trigger <= data.odometer
  ) {
    ctx.addIssue({
      code: "custom",
      message: "Reminder distance must be greater than current odometer",
      path: ["odometer_trigger"], 
    });
  }
})

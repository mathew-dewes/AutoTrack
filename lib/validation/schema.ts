import z from "zod";
import { Log_type, Service_type } from "./enums";

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
});

export const repairFormSchema = z.object({
  title: z.string().min(1, "Repair title is required"),
  description: z.string().max(200, 'Description must be 200 characters or less').optional(),
  date: z.date('Refuel date is required'),
  odometer: z.number("Odometer reading is required").min(1).max(1000000),
  cost: z.number("Cost is required"),
  service_type: z.enum(Service_type, "Please select a service type"),
})


export const logSchema = z.object({
  type: z.enum(Log_type, 'Log type is required'),
  service_type: z.enum(Service_type).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  cost: z.number(),
  odometer: z.number("Odometer reading is required").min(1).max(1000000),
  date: z.date(),
  fuel_litres: z.number().optional(),


}).superRefine((data, ctx) => {

  if (data.type === "fuel") {
    if (data.fuel_litres === undefined) {
      ctx.addIssue({
        path: ["fuel_litres"],
        message: "Fuel litres is required for fuel logs",
        code: "custom"
      });
    }

    if (data.cost === undefined) {
      ctx.addIssue({
        path: ["cost"],
        message: "Cost is required for fuel logs",
        code: "custom"
      });
    }
  }

  if (data.type === "maintenance" || data.type === "repair") {
    if (!data.service_type) {
      ctx.addIssue({
        path: ["service_type"],
        message: "Service type is required",
        code: "custom"
      });
    }

    if (!data.title || data.title.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["title"],
        message: "Title is required",
      });
    }

    if (!data.description || data.description.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["description"],
        message: "Description is required",
      });
    }


    if (data.cost === undefined) {
      ctx.addIssue({
        path: ["cost"],
        message: "Cost is required",
        code: "custom"
      });
    }
  }
});
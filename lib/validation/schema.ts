import z from "zod";

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
  licence_plate: z.string().min(4).max(6)
})
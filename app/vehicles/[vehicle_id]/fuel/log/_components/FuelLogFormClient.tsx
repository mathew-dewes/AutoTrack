"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { fuelLogSchema } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { FuelLogDatePicker } from "./FuelLogDatePicker";
import { addFuelLog } from "@/lib/db/mutations/fuel";
import { useQueryClient } from "@tanstack/react-query";

export default function FuelLogFormClient({ vehicle_id, odometer }:
    { vehicle_id: string, odometer: number }
) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof fuelLogSchema>>({
        resolver: zodResolver(fuelLogSchema),
        defaultValues: {
            date: new Date(),
            cost: undefined,
            fuel_litres: undefined,
            odometer,
            vendor: "",

        }
    });

    function onSubmit(values: z.infer<typeof fuelLogSchema>) {
        startTransition((async () => {
            console.log(values);
            const res = await addFuelLog(values, vehicle_id)


            if (res.error) {
                form.setError("root", {
                    message: res.error
                });


            };

            if (res.fieldErrors) {
                Object.entries(res.fieldErrors).forEach(([field, message]) => {
                    form.setError(field as keyof z.infer<typeof fuelLogSchema>,
                        { message }
                    )
                });



            }

            if (res?.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({
                    queryKey: [
                        `vehicle-${vehicle_id}-fuel`]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        `vehicle-${vehicle_id}`]
                });



                router.push(`/vehicles/${vehicle_id}/fuel`)


            }

        }))


    }

    return (
        <Card className="w-full max-w-md mt-5">
            <CardHeader>
                <CardTitle className="font-semibold">Fuel log</CardTitle>
            </CardHeader>

            <CardContent>
                <form id="fuelLogForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="date"
                            render={({ fieldState, field }) => (


                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Date</FieldLabel>
                                    <FuelLogDatePicker
                                        value={field.value}
                                        onChange={(date) => field.onChange(date)} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}


                                </Field>

                            )}
                        >

                        </Controller>


                        <Controller
                            control={form.control}
                            name="odometer"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Odometer reading</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        aria-disabled={fieldState.invalid}
                                        placeholder="Enter vehicles odometer reading"
                                        value={field.value ?? ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            field.onChange(value === "" ? undefined : Number(value));
                                        }}
                                    />
                                    <FieldDescription>Ensure odometer reading is from time of refuel for best accuracy</FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        >

                        </Controller>

                        <Controller
                            control={form.control}
                            name="vendor"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Vendor</FieldLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        aria-disabled={fieldState.invalid}
                                        placeholder="Enter vendor name - BP, Z Energy, Gull, Caltex etc"


                                    />
                                    <FieldDescription>Please enter the business which completed the service</FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        >

                        </Controller>

                        <Controller
                            control={form.control}
                            name="cost"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Cost</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        aria-disabled={fieldState.invalid}
                                        placeholder="Enter cost of maintenance"
                                        value={field.value ?? ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            field.onChange(value === "" ? undefined : Number(value));
                                        }}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        >

                        </Controller>

                        <Controller
                            control={form.control}
                            name="fuel_litres"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Litres of fuel</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        aria-disabled={fieldState.invalid}
                                        placeholder="Enter the amount of litres filled"
                                        value={field.value ?? ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            field.onChange(value === "" ? undefined : Number(value));
                                        }}

                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        >

                        </Controller>

                        <Controller
                            control={form.control}
                            name="notes"
                            render={({ field, fieldState }) => (


                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Notes: (Optional)</FieldLabel>
                                    <Textarea
                                        {...field}
                                        value={field.value ?? ""}

                                        aria-disabled={fieldState.invalid}
                                        placeholder="Enter log description - Max 200 words"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}


                                </Field>
                            )}
                        >

                        </Controller>
                    </FieldGroup>

                    {form.formState.errors.root && (
                        <div className="mt-4 text-red-400">
                            {form.formState.errors.root.message}
                        </div>
                    )}
                </form>
            </CardContent>

            <CardFooter>
                <div className="flex gap-2">
                    <Button disabled={isPending} form="fuelLogForm">Submit</Button>
                    <Button onClick={() => form.reset()}>Clear form</Button>
                </div>

            </CardFooter>

        </Card>
    )

}
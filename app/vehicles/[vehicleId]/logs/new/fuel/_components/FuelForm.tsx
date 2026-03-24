"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { fuelLogSchema } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { LogDatePicker } from "../../_components/LogDatePicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { addFuelLog } from "@/lib/db/mutations/logs";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function FuelForm({ vehicleId }:
    { vehicleId: string }
) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<z.infer<typeof fuelLogSchema>>({
        resolver: zodResolver(fuelLogSchema),
        defaultValues: {
            date: undefined,
            cost: undefined,
            fuel_litres: undefined,
            odometer: undefined
        }
    });

    function onSubmit(values: z.infer<typeof fuelLogSchema>) {
        startTransition((async () => {
            const res = await addFuelLog(values, vehicleId);

            if (res.error) {
                form.setError("root", {
                    message: res.error
                });
                toast.error(res.error)


            };

            if (res.fieldErrors) {
                Object.entries(res.fieldErrors).forEach(([field, message]) => {
                    form.setError(field as keyof z.infer<typeof fuelLogSchema>,
                        { message }
                    )
                });

                toast.error(res.error)

            }

            if (res?.success) {
                toast.success(res.message);
      


                router.push(`/vehicles/${vehicleId}/fuel`)


            }


        }))
      

    }

    return (
        <Card className="w-full max-w-lg">
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
                                    <LogDatePicker
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
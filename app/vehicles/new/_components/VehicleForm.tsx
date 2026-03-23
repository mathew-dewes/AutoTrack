"use client";

import { Button } from "@/components/ui/button";
import { ButtonSpinner } from "@/components/ui/button-spinner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addVehicle } from "@/lib/db/mutations/vehicle"


import { vehicleSchema } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function VehicleForm() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof vehicleSchema>>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            make: "",
            model: "",
            licence_plate: "",
            year: undefined,
            odometer: undefined

        }
    });

    function onSubmit(values: z.infer<typeof vehicleSchema>) {
        startTransition((async () => {
            const res = await addVehicle(values);

            if (res.error) {
                form.setError("root", {
                    message: res.error
                });
                toast.error(res.error)
            };

            if (res.fieldErrors) {
                Object.entries(res.fieldErrors).forEach(([field, message]) => {
                    form.setError(field as keyof z.infer<typeof vehicleSchema>,
                        { message }
                    )
                });

                toast.error(res.error)

            }

            if (res?.success) {
                toast.success(res.message);


                router.push('/vehicles')


            }

        }))
    }

    return <div className="flex flex-col gap-6 max-w-xl">
        <Card>
            <CardHeader>
                <CardTitle className="font-bold">Vehicle Details</CardTitle>
                <CardDescription>Enter you vehicle details</CardDescription>
            </CardHeader>

            <CardContent>
                <form id="vehicleForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="make"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Make:</FieldLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        aria-disabled={fieldState.invalid}
                                        placeholder="Vehicle make"
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
                            name="model"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Model:</FieldLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        aria-disabled={fieldState.invalid}
                                        placeholder="Vehicle model"
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
                            name="year"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Year:</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        aria-disabled={fieldState.invalid}
                                        placeholder="Vehicle model year"
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
                            name="licence_plate"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Licence plate number:</FieldLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        aria-disabled={fieldState.invalid}
                                        placeholder="Licence plate number"

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
                            name="odometer"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Odometer reading:</FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        aria-disabled={fieldState.invalid}
                                        placeholder="Vehicle model year"
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
                    </FieldGroup>

                </form>
            </CardContent>

            <CardFooter className="flex-col gap-4">


                {!isPending ?
                    <Button disabled={isPending} form="vehicleForm" className="w-full">Add Vehicle</Button>
                    : <ButtonSpinner text="Adding Vehicle" />}
                <Button disabled={isPending} onClick={() => form.reset()} variant={"outline"} className="w-full">Clear form</Button>
            </CardFooter>

        </Card>

    </div>
}
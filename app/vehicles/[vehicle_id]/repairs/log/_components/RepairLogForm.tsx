"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form"
import z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


import { toast } from "sonner";
import { RepairLogDatePicker } from "./RepairLogDatePicker";
import LogServiceSelector from "./LogServiceSelector";
import { repairFormSchema } from "@/lib/validation/schema";
import { addRepairLog } from "@/lib/db/mutations/repair";
import { useQueryClient } from "@tanstack/react-query";


export default function RepairLogForm({ vehicle_id, odometer }:
    { vehicle_id: string, odometer: number }
) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof repairFormSchema>>({
        resolver: zodResolver(repairFormSchema),
        defaultValues: {
            notes: "",
            cost: undefined,
            odometer,
            date: new Date(),
            repair_type: undefined,
            vendor: "",

        }
    });


    function onSubmit(values: z.infer<typeof repairFormSchema>) {
        startTransition((async () => {

            const res = await addRepairLog(values, vehicle_id)

            if (res.error) {
                form.setError("root", {
                    message: res.error
                });



            };

            if (res.fieldErrors) {
                Object.entries(res.fieldErrors).forEach(([field, message]) => {
                    form.setError(field as keyof z.infer<typeof repairFormSchema>,
                        { message }
                    )
                });


            }

            if (res?.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: [`vehicle-${vehicle_id}-repairs`] });
                queryClient.invalidateQueries({
                    queryKey: [
                        `vehicle-${vehicle_id}`]
                });
                router.push(`/vehicles/${vehicle_id}/repairs`)


            }


        }))


    }


    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="font-semibold">Repair form</CardTitle>
            </CardHeader>

            <CardContent>
                <form id="repairForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="date"
                            render={({ fieldState, field }) => (


                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Date</FieldLabel>
                                    <RepairLogDatePicker
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
                                    <FieldDescription>Ensure entered reading is from time of service for best accuracy</FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        >

                        </Controller>
                        <Controller
                            control={form.control}
                            name="repair_type"
                            render={({ fieldState, field }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Service type</FieldLabel>
                                    <LogServiceSelector
                                        value={field.value ?? ""}
                                        onChange={(val) => field.onChange(val ?? undefined)} />
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
                                        placeholder="Enter vendor name - Mechanic, Auto repairer etc"


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
                                    <FieldLabel>Total cost</FieldLabel>
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
                    <Button disabled={isPending} form="repairForm">Submit</Button>
                    <Button onClick={() => form.reset()}>Clear form</Button>
                </div>

            </CardFooter>


        </Card>
    )
}
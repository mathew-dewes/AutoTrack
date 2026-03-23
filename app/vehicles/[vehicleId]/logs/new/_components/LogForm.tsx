"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { logSchema } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import LogTypeSelector from "./LogTypeSelector";
import { LogDatePicker } from "./LogDatePicker";
import LogServiceSelector from "./LogServiceSelector";
import { useEffect } from "react";

export default function LogForm() {

const form = useForm<z.infer<typeof logSchema>>({
        resolver: zodResolver(logSchema),
        defaultValues: {
            title: "",
            description: "",
            service_type: undefined,
            fuel_litres: undefined,
            date: undefined,
            cost: undefined,
            odometer: undefined,
            type: undefined
        }
    });

    console.log(form.formState.errors);
    

     
        const logType = form.watch("type");

        useEffect(() => {
    form.reset({
      type: logType,
      service_type: undefined,
      title: "",
      description: "",
      fuel_litres: undefined,
      date: undefined,
      cost: undefined,
      odometer: undefined,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logType]);


    function onSubmit(values: z.infer<typeof logSchema>) {
        console.log(values);

    };




    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="font-semibold">Log Form</CardTitle>
            </CardHeader>

            <CardContent>
                <form id="logForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="type"
                            render={({ fieldState, field }) => (


                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Log type</FieldLabel>
                                    <LogTypeSelector
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}


                                </Field>

                            )}
                        >

                        </Controller>
                        {logType == "maintenance" &&
                            <Controller
                                control={form.control}
                                name="service_type"
                                render={({ fieldState, field }) => (


                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Service type</FieldLabel>
                                        <LogServiceSelector
                                            value={field.value}
                                            onChange={(val) => field.onChange(val ?? undefined)} />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}


                                    </Field>

                                )}
                            >

                            </Controller>
                        }



                        {logType == "maintenance" &&
                            <Controller
                                control={form.control}
                                name="title"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Service title</FieldLabel>
                                        <Input
                                            {...field}
                                            type="text"
                                            aria-disabled={fieldState.invalid}
                                            value={field.value ?? ""}
                                            
                                            placeholder="Enter log title - Brake replacement, service, fuel entry etc"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </Field>
                                )}
                            >

                            </Controller>}

                        {logType == "maintenance" &&

                            <Controller
                                control={form.control}
                                name="description"
                                render={({ field, fieldState }) => (


                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Description</FieldLabel>
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
                        }






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
                                        value={field.value}
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
                            name="date"
                            render={({ fieldState, field }) => (


                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        {logType == "fuel" ?
                                            "Date of refuel" :
                                            "Date of service"}</FieldLabel>
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

                        {/* Fuel specific fields */}

                        {logType == "fuel" &&
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
                                            value={field.value}
                                      
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </Field>
                                )}
                            >

                            </Controller>
                        }






                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <div className="flex gap-2">
                    <Button form="logForm">Submit</Button>
                    <Button onClick={() => form.reset()}>Clear form</Button>
                </div>

            </CardFooter>
        </Card>
    )
}
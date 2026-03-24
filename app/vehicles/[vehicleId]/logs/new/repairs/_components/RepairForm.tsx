"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { repairFormSchema } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form"
import z from "zod";
import LogServiceSelector from "../../_components/LogServiceSelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LogDatePicker } from "../../_components/LogDatePicker";
import { addRepairLog } from "@/lib/db/mutations/logs";
import { toast } from "sonner";

export default function RepairForm({vehicleId}:
    {vehicleId: string}
){
        const [isPending, startTransition] = useTransition();
        const router = useRouter();
    
    const form = useForm<z.infer<typeof repairFormSchema>>({
        resolver: zodResolver(repairFormSchema),
        defaultValues:{
            title: "",
            notes: "",
            cost: undefined,
            odometer: undefined,
            date: undefined,
            service_type:undefined
        }
    });

    function onSubmit(values: z.infer<typeof repairFormSchema>){
           startTransition((async () => {
            const res = await addRepairLog(values, vehicleId);

            if (res.error) {
                form.setError("root", {
                    message: res.error
                });
                toast.error(res.error)


            };

            if (res.fieldErrors) {
                Object.entries(res.fieldErrors).forEach(([field, message]) => {
                    form.setError(field as keyof z.infer<typeof repairFormSchema>,
                        { message }
                    )
                });

                toast.error(res.error)

            }

            if (res?.success) {
                toast.success(res.message);
      


                router.push(`/vehicles/${vehicleId}/repairs`)


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
                                name="service_type"
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
                                name="title"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Service title</FieldLabel>
                                        <Input
                                            {...field}
                                            type="text"
                                            aria-disabled={fieldState.invalid}
                                            value={field.value}
                                            
                                            placeholder="Enter log title - Brake replacement, service, fuel entry etc"
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
                </FieldGroup>
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
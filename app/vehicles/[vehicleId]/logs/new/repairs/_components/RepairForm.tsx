"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { repairFormSchema } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form"
import z from "zod";
import LogServiceSelector from "../../_components/LogServiceSelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LogDatePicker } from "../../_components/LogDatePicker";
import { addRepairLog } from "@/lib/db/mutations/logs";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

export default function RepairForm({ vehicleId, odometer }:
    { vehicleId: string, odometer: number }
) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof repairFormSchema>>({
        resolver: zodResolver(repairFormSchema),
        defaultValues: {
            notes: "",
            cost: undefined,
            odometer,
            date: new Date(),
            service_type: undefined,
            odometer_trigger: undefined,
            vendor: "",
            enable_reminders: false
        }
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const enableReminder = form.watch("enable_reminders");

    useEffect(() => {
        if (!enableReminder) {
            form.setValue("odometer_trigger", undefined)
        }
    }, [enableReminder, form])

    function onSubmit(values: z.infer<typeof repairFormSchema>) {
        startTransition((async () => {


            const res = await addRepairLog(values, vehicleId);

            if (!res.success) {

                const { fieldErrors, formError } = res;
                if (fieldErrors) {
                    Object.entries(fieldErrors).forEach(([field, message]) => {
                        form.setError(field as keyof z.infer<typeof repairFormSchema>,
                            { message }
                        )
                    });
                    toast.error("Please fix the highlighted fields");

                }

                if (formError) {
                    form.setError("root", { message: formError });
                    toast.error(formError)
                }

                return;
            }

          

            toast.success(res.message);

            if (res.notification){
                toast.info("Reminder has been set")
            }
        



            router.push(`/vehicles/${vehicleId}/repairs`)







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

                        <div className="space-y-6">
                            <Controller
                                control={form.control}
                                name="enable_reminders"
                                render={({ field, fieldState }) => (
                                    <Field orientation="horizontal">
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) => field.onChange(!!checked)}
                                            id="terms-checkbox-2"
                                            name="terms-checkbox-2"
                                            defaultChecked
                                        />
                                        <FieldContent>
                                            <FieldLabel htmlFor="terms-checkbox-2">
                                                Enable reminder
                                            </FieldLabel>
                                            <FieldDescription>
                                                By enabling reminders, you agree to recieve a once off email for the next occurance of the repair service your provided.
                                            </FieldDescription>
                                        </FieldContent>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>

                                )}
                            >

                            </Controller>

                            {/* Reminder section */}

                            <Collapsible open={enableReminder}>
                                <CollapsibleContent>
                                    <FieldGroup>
                                        <Controller
                                            control={form.control}
                                            name="odometer_trigger"
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel>Remind by distance (km)</FieldLabel>
                                                    <FieldDescription>Distance where email reminder will trigger</FieldDescription>

                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        aria-disabled={fieldState.invalid}
                                                        value={field.value ?? ""}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            field.onChange(value === "" ? undefined : Number(value));
                                                        }}

                                                        placeholder="Enter distance you wish to be remindered at"
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}

                                                </Field>
                                            )}
                                        >

                                        </Controller>

                
                                    </FieldGroup>
                                </CollapsibleContent>
                            </Collapsible>
                        </div>



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
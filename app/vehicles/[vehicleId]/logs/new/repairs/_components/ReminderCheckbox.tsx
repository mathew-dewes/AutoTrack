"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"


export function ReminderCheckBox() {
  return (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal">
        <Checkbox
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
      </Field>
   
  
    </FieldGroup>
  )
}

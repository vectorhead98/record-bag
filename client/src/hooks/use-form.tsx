import { createFormHook } from "@tanstack/react-form"
import { fieldContext, formContext } from "./form-context"
import { SubmitFormButton } from "@/components/fields/submit-form"
import { TextField } from "@/components/fields/text-field"

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField },
  formComponents: { SubmitFormButton },
})

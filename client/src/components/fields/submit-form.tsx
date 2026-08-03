import { useFormContext } from "@/hooks/form-context"
import { Button } from "../ui/button"
import { Field } from "../ui/field"

export function SubmitFormButton() {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isSubmitting}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </Field>
      )}
    </form.Subscribe>
  )
}

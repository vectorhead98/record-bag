import { useRouter } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { loginSchema } from "@record-bag/shared"
import { authQueryKey, handleAuthLogin } from "@/api/auth"
import { useAppForm } from "@/hooks/use-form"
import { FieldGroup, FieldSeparator, FieldSet } from "../ui/field"
import { toast } from "../ui/toast"

export function LoginForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const form = useAppForm({
    defaultValues: { username: "", password: "" },
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        const user = await handleAuthLogin(value)
        if (!user) throw new Error("Invalid Credentials")
        formApi.setFieldValue("password", "")
        queryClient.setQueryData(authQueryKey, user)
        await router.invalidate()
      } catch (err) {
        toast.add({
          type: "error",
          description: err instanceof Error ? err.message : "Login failed",
        })
        formApi.setFieldValue("password", "")
      }
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="w-full"
    >
      <FieldSet>
        <FieldGroup>
          <form.AppField name="username">
            {(field) => <field.TextField label="Username" />}
          </form.AppField>
          <form.AppField name="password">
            {(field) => <field.TextField label="Password" type="password" />}
          </form.AppField>
          <FieldSeparator />
          <form.AppForm>
            <form.SubmitFormButton labels={["Login", "..."]} />
          </form.AppForm>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}

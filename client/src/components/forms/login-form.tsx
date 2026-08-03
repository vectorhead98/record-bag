import { useRouter } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { authMeQueryKey, handleAuthLogin } from "@/api/auth"
import { useAppForm } from "@/hooks/use-form"
import { loginSchema } from "@record-bag/shared"
import { FieldGroup, FieldSeparator, FieldSet } from "../ui/field"
import { toast } from "../ui/toast"

export function LoginForm() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const form = useAppForm({
    defaultValues: { username: "", password: "" },
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        const user = await handleAuthLogin(value)
        if (!user) throw new Error("Invalid Credentials")
        queryClient.setQueryData(authMeQueryKey, user)
        await router.invalidate()
        formApi.reset()
      } catch (err) {
        toast.add({
          type: "error",
          description: err instanceof Error ? err.message : "Login failed",
        })
        formApi.reset()
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
            <form.SubmitFormButton />
          </form.AppForm>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}

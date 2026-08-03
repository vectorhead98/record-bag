import { createFileRoute, redirect } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/forms/login-form"
import cover from "/sossusvlei.webp"

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/albums" })
    }
  },
  component: Index,
})

function Index() {
  return (
    <>
      <div className="fixed h-screen w-full">
        <img
          src={cover}
          alt="sossusvlei"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="h-screen flex flex-col items-center justify-center">
        <Card className="h-96 w-80 z-10 bg-background/80 dark:bg-background/70">
          <CardHeader>
            <CardTitle className="text-xl text-center">Record Bag</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col items-center justify-center -mt-4">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

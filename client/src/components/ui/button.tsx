import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    `
    group/button inline-flex shrink-0 items-center justify-center
    rounded-md border border-transparent bg-clip-padding
    text-xs/relaxed font-medium whitespace-nowrap
    transition-all outline-none select-none
    `,
    `
    focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30
    disabled:pointer-events-none disabled:opacity-50
    active:not-aria-[haspopup]:translate-y-px
    `,
    `
    aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20
    dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40
    `,
    `
    [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
    `,
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: `
          border-border dark:bg-input/30 hover:bg-input/50 hover:text-foreground
          aria-expanded:bg-muted aria-expanded:text-foreground
        `,
        secondary: `
          bg-secondary text-secondary-foreground
          hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]
          aria-expanded:bg-secondary aria-expanded:text-secondary-foreground
        `,
        ghost: `
          hover:bg-muted dark:hover:bg-muted/50 hover:text-foreground
          aria-expanded:bg-muted aria-expanded:text-foreground
        `,
        destructive: `
          text-destructive bg-destructive/10 dark:bg-destructive/20
          hover:bg-destructive/20 dark:hover:bg-destructive/30
          focus-visible:border-destructive/40 focus-visible:ring-destructive/20
          dark:focus-visible:ring-destructive/40
        `,
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: `
          h-5 gap-1 px-2 text-[0.625rem] [&_svg:not([class*='size-'])]:size-2.5
          has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5
        `,
        sm: `
          h-6 gap-1 px-2 text-xs/relaxed [&_svg:not([class*='size-'])]:size-3
          has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5
        `,
        md: `
          h-7 gap-1 px-2 text-xs/relaxed [&_svg:not([class*='size-'])]:size-3.5
          has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5
        `,
        lg: `
          h-8 gap-1 px-2.5 text-xs/relaxed [&_svg:not([class*='size-'])]:size-4
          has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2
        `,
        icon_xs: "size-5 [&_svg:not([class*='size-'])]:size-2.5",
        icon_sm: "size-6 [&_svg:not([class*='size-'])]:size-3",
        icon_md: "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        icon_lg: "size-8 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

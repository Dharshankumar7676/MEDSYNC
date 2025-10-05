"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/90",
        primary: "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-black hover:shadow-lg hover:shadow-[var(--color-primary)]/20 hover:scale-105",
        secondary: "bg-[var(--color-surface)] border border-[var(--color-primary)]/40 text-[var(--color-text-primary)] hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-primary)]/10",
        ghost: "bg-transparent hover:bg-[var(--color-surface)] text-[var(--color-text-primary)]",
      },
      size: {
        icon: "h-9 w-9",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }

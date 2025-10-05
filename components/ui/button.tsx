"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl transition-all duration-200 uppercase text-sm font-semibold focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/90",
        primary: "bg-gradient-to-r from-[#FF00A8] to-[#00FF88] text-black hover:opacity-90",
        secondary: "border border-[#FF00A8] text-[#FF00A8] hover:bg-[#FF00A8]/10",
        ghost: "bg-transparent text-white hover:text-[#00FF88]",
      },
      size: {
        icon: "h-9 w-9",
        sm: "px-3 py-1.5",
        md: "px-4 py-2",
        lg: "px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
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

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
className={cn(
          "flex h-10 w-full rounded-xl border bg-[#0F0F0F] px-3 py-2 text-sm",
          "border-[#2E2E2E] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]",
          "focus:outline-none focus:border-[#FF00A8] focus:shadow-[0_0_8px_#FF00A8]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

// components/ui/alert.tsx
import { cn } from "@/lib/utils"

interface AlertProps {
  variant?: "default" | "destructive"
  className?: string
  children: React.ReactNode
}

export function Alert({ className, variant = "default", children }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4 flex items-start gap-3",
        variant === "destructive" &&
          "border-destructive/50 bg-destructive/10 text-destructive",
        variant === "default" &&
          "border-border bg-card text-card-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}

export function AlertTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)}>
      {children}
    </h5>
  )
}

export function AlertDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("text-sm leading-relaxed", className)}>
      {children}
    </div>
  )
}
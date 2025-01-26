import type * as React from "react";
import { cn } from "@/lib/utils";

export interface DottedSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "green";
}

const sizeClasses = {
  sm: "h-4 gap-1",
  md: "h-8 gap-1.5",
  lg: "h-12 gap-2",
};

const dotSizeClasses = {
  sm: "w-1 h-1",
  md: "w-2 h-2",
  lg: "w-3 h-3",
};

const colorClasses = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  green: "bg-green-500",
};

export function Spinner({
  size = "md",
  color = "primary",
  className,
  ...props
}: DottedSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "flex items-center justify-center",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            "rounded-full animate-bounce",
            dotSizeClasses[size],
            colorClasses[color]
          )}
          style={{ animationDelay: `${index * 0.1}s` }}
        ></div>
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
}

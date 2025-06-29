import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-md text-xs sm:text-sm md:text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3 sm:[&_svg]:size-4 md:[&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-95",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 sm:h-8 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md",
        sm: "h-8 sm:h-9 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-md",
        default:
          "h-9 sm:h-10 md:h-11 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base rounded-md",
        lg: "h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-md",
        xl: "h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl rounded-lg",
        icon: "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 p-1.5 sm:p-2 md:p-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

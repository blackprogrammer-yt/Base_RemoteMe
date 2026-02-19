import * as React from "react";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef(
    ({ checked, onCheckedChange, disabled, className, ...props }, ref) => {
        const handleClick = () => {
            if (disabled) return;
            onCheckedChange?.(!checked);
        };

        const state = checked ? "checked" : "unchecked";

        return (
            <button
                ref={ref}
                type="button"
                role="switch"
                aria-checked={checked}
                data-state={state}
                disabled={disabled}
                onClick={handleClick}
                className={cn(
                    "inline-flex h-5 w-9 items-center rounded-full border border-input bg-muted transition-colors data-[state=checked]:bg-primary data-[state=checked]:border-primary disabled:cursor-not-allowed disabled:opacity-60",
                    className,
                )}
                {...props}
            >
                <span
                    className={cn(
                        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow transition-transform",
                        checked ? "translate-x-4" : "translate-x-0",
                    )}
                />
            </button>
        );
    },
);

Switch.displayName = "Switch";

export { Switch };


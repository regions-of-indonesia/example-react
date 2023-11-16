import { forwardRef } from "react";
import type { ChangeEvent, JSX } from "react";

import clsx from "clsx";

const Select = forwardRef<
  HTMLSelectElement,
  Omit<JSX.IntrinsicElements["select"], "onChange"> & { onChange?: (value: string, event: ChangeEvent<HTMLSelectElement>) => void }
>(({ className, onChange, ...props }, ref) => (
  <select
    {...props}
    ref={ref}
    className={clsx("block w-full bg-neutral-1 text-neutral-12 focus:border-primary-9 rounded-xl focus:ring-primary-9", className)}
    onChange={(event) => {
      onChange?.(event.currentTarget.value, event);
    }}
  />
));

export default Select;

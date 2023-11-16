import { forwardRef } from "react";
import type { JSX } from "react";

import clsx from "clsx";

const Label = forwardRef<HTMLLabelElement, JSX.IntrinsicElements["label"]>(({ className, ...props }, ref) => (
  <label {...props} ref={ref} className={clsx("text-neutral-11 text-base font-medium", className)} />
));

export default Label;

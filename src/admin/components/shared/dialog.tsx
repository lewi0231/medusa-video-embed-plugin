import { XMark } from "@medusajs/icons";
import { clx } from "@medusajs/ui";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const DialogContent = React.forwardRef(
  (
    { children, className, ...props }: Props,
    forwardedRef: React.ForwardedRef<any>
  ) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay />
      <DialogPrimitive.Content
        className={clx(
          "fixed w-full top-1/2 left-1/2 duration-200 -translate-x-1/2 -translate-y-1/2 p-6 max-h-[85vh] max-w-[750px] shadow-md rounded-md bg-white",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

export const DialogTitle = React.forwardRef(
  (
    {
      children,
      className,
      closeIcon = true,
      ...props
    }: Props & { closeIcon?: boolean },
    forwardedRef: React.ForwardedRef<any>
  ) => (
    <div className="flex items-center justify-between">
      <DialogPrimitive.Title
        ref={forwardedRef}
        {...props}
        className={className}
      >
        {children}
      </DialogPrimitive.Title>
      {closeIcon ? (
        <DialogPrimitive.Close aria-label="Close" className="cursor-pointer">
          <XMark />
        </DialogPrimitive.Close>
      ) : (
        ""
      )}
    </div>
  )
);

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogDescription = DialogPrimitive.Description;

"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends React.ComponentProps<"input"> {
  wrapperClassName?: string;
}

export function PasswordInput({
  className,
  wrapperClassName,
  disabled,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("relative flex items-center w-full", wrapperClassName)}>
      <Input
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        className={cn("pr-10", className)}
        {...props}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-700 transition-colors focus:outline-hidden disabled:opacity-50 cursor-pointer"
        aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4 text-slate-500" />
        ) : (
          <Eye className="w-4 h-4 text-slate-500" />
        )}
      </button>
    </div>
  );
}

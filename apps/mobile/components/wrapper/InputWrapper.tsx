import * as React from "react";
import { Input } from "../ui/input";
import { View } from "react-native";
import { cn } from "@/lib/utils";

interface InputWithIconProps extends React.ComponentProps<typeof Input> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

function InputWrapper({
  leftIcon,
  rightIcon,
  startIcon,
  className,
  ...props
}: InputWithIconProps) {
  return (
    <View className="relative w-full">
      {leftIcon && (
        <View className="pointer-events-none absolute translate-y-2.5 left-3 flex items-center z-10">
          {leftIcon}
        </View>
      )}

      <Input
        className={cn(leftIcon && "pl-10", rightIcon && "pr-10", className)}
        {...props}
      />

      {rightIcon && (
        <View className="absolute inset-y-0 right-3 top-2 flex items-center text-muted-foreground">
          {rightIcon}
        </View>
      )}
    </View>
  );
}

export { InputWrapper };

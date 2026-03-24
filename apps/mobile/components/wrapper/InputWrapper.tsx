import * as React from "react";
import { Input } from "../ui/input";
import { View } from "react-native";

interface InputWithIconProps extends React.ComponentProps<typeof Input> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function InputWrapper({
  leftIcon,
  rightIcon,
  className,
  ...props
}: InputWithIconProps) {
  return (
    <View className="relative w-full">
      {leftIcon && (
        <View className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
          {leftIcon}
        </View>
      )}

      <Input
        className={`${leftIcon} && "pl-10", ${rightIcon} && "pr-10", ${className}`}
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

import * as React from "react";
import { View } from "react-native";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonWithIconProps extends ButtonProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  children?: React.ReactNode;
}

function ButtonWrapper({
  leftIcon,
  rightIcon,
  startIcon,
  children,
  className,
  ...props
}: ButtonWithIconProps) {
  const useNewLayout = Boolean(startIcon);

  return (
    <Button
      className={cn(
        "flex-row items-center justify-center",
        useNewLayout && "gap-2",
        !useNewLayout && leftIcon && "pl-3",
        !useNewLayout && rightIcon && "pr-3",
        className,
      )}
      {...props}
    >
      {startIcon && <View className="items-center">{startIcon}</View>}

      {!startIcon && leftIcon && (
        <View className="items-center">{leftIcon}</View>
      )}

      <View className="items-center">{children}</View>

      {rightIcon && <View className="items-center">{rightIcon}</View>}
    </Button>
  );
}

export { ButtonWrapper };

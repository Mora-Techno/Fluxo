import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { Input } from "./input";

const OTPInput = ({ length = 4 }: { length?: number }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));

  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
      {otp.map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputs.current[index] = el as any)}
          style={{ width: 50, textAlign: "center", fontSize: 20 }}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          value={otp[index]}
        />
      ))}
    </View>
  );
};

export default OTPInput;

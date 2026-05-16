import { FlatColors } from "@/core/providers/theme.provinder";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "@/components/ui/text";
import LottieView from "lottie-react-native";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { PickAddUsername, QueryUsernameRespone } from "@repo/shared";
import { Ionicons } from "@expo/vector-icons";
import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";

interface AddUsernameSectionProps {
  ns: {
    theme: FlatColors;
  };
  state: {
    isKeyboardVisible: boolean;
    setIsKeyBoardVisible: React.Dispatch<React.SetStateAction<boolean>>;
    lottieSize: any;
    setIsQuery: React.Dispatch<React.SetStateAction<string>>;
    isQuery: string;
    formAddUsername: PickAddUsername;
  };
  service: {
    query: {
      respone: QueryUsernameRespone;
      isLoading: boolean;
    };
    mutate: {
      addUsername: () => void;
      isPending: boolean;
    };
  };
}

const AddUsernameSection: React.FC<AddUsernameSectionProps> = ({
  state,
  ns,
  service,
}) => {
  const resolve = service.query.respone ?? "";
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: state.isKeyboardVisible ? "flex-start" : "center",
        alignItems: "center",
      }}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={24}
      style={{ flex: 1, backgroundColor: ns.theme.background }}
    >
      <View
        className="items-center w-full  px-6"
        style={{ paddingVertical: state.isKeyboardVisible ? 20 : 48 }}
      >
        <View
          className="items-center w-full"
          style={{ marginBottom: state.isKeyboardVisible ? 20 : 40 }}
        >
          <View className="w-full gap-2 min-h-screen">
            <View className="w-full flex justify-center items-center border bg-primary/80 rounded-xl ">
              <LottieView
                autoPlay
                loop
                style={{ width: state.lottieSize, height: state.lottieSize }}
                source={require("@/assets/lottie/ProfileUserCard.json")}
              />
            </View>
            <View className="w-full flex justify-center items-center">
              <Text variant={"h1"} className="font-semibold ">
                Select Your Username
              </Text>
              <Text variant={"p"} className="font-semibold text-center">
                This username will be used to identify you within the MORA smart
                device ecosystem.{" "}
              </Text>
            </View>
            <InputWrapper
              value={state.isQuery}
              onChangeText={(e) => state.setIsQuery(e)}
              rightIcon={
                resolve.username ? (
                  <Ionicons
                    name="alert-outline"
                    size={18}
                    color={ns.theme.destructive}
                  />
                ) : (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color={ns.theme.success}
                  />
                )
              }
            />

            {resolve.username ? (
              <Text className="font-semibold ">
                Username:{" "}
                <Text className="text-destructive">
                  {resolve.username} has already been used
                </Text>
              </Text>
            ) : null}

            <View className="w-full">
              <ButtonWrapper
                onPress={() => service.mutate.addUsername()}
                disabled={service.mutate.isPending || !!resolve}
              >
                <Text variant={"h1"} className="font-semibold">
                  Add
                </Text>
              </ButtonWrapper>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddUsernameSection;

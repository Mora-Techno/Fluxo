import AddUsernameSection from "@/components/section/auth/addUsername/page-section";
import { View } from "react-native";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { useState, useMemo } from "react";
import { useServiceMobile } from "@/hooks/service/module/useService";
import { PickAddUsername, unwrapResponse } from "@repo/shared";
import { useLocalSearchParams } from "expo-router";
import { QueryUsernameRespone } from "@repo/shared";

const AddUsernameContainer = () => {
  const ns = useAppNameSpace();
  const service = useServiceMobile();
  const params = useLocalSearchParams<any>();
  //state
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [isQuery, setIsQuery] = useState<string>("");

  const formAddUsername: PickAddUsername = {
    email: params.email,
    phone: params.phone,
    username: isQuery,
  };

  // query
  const query = service.auth.query.getUsername(isQuery);
  const queryRespone = unwrapResponse(query ?? "") as QueryUsernameRespone;

  // mutate
  const addUsernameMutate = service.auth.mutation.addUsername();

  // not test
  const handleAddUsername = async () => {
    await addUsernameMutate.AddUsername(formAddUsername);
  };

  const lottieSize = useMemo(
    () => (isKeyboardVisible ? 140 : 300),
    [isKeyboardVisible],
  );
  return (
    <View className="w-full min-h-screen">
      <AddUsernameSection
        ns={{
          theme: ns.colors,
        }}
        state={{
          isKeyboardVisible: isKeyboardVisible,
          setIsKeyBoardVisible: setIsKeyboardVisible,
          lottieSize: lottieSize,
          isQuery: isQuery,
          setIsQuery: setIsQuery,
          formAddUsername: formAddUsername,
        }}
        service={{
          query: {
            respone: queryRespone ?? null,
            isLoading: query.isLoading,
          },
          mutate: {
            addUsername: handleAddUsername,
            isPending: addUsernameMutate.isPending,
          },
        }}
      />
    </View>
  );
};

export default AddUsernameContainer;

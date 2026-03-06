import HomeUserSection from "@/components/section/private/user/home/page-section";
import { useServiceMobile } from "@/hooks/service/module/useService";
import { View } from "react-native";

const HomeUserContainer = () => {
  const service = useServiceMobile();

  // mutate
  const logoutMutate = service.auth.mutation.logout();

  //handler
  const handleLogout = () => {
    logoutMutate.Logout();
  };

  return (
    <View className="w-full min-h-screen">
      <HomeUserSection
        service={{
          mutation: {
            isPending: logoutMutate.isPending,
            logout: handleLogout,
          },
        }}
      />
    </View>
  );
};
export default HomeUserContainer;

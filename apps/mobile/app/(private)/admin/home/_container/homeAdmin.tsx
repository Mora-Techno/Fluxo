import HomeUserSection from "@/components/section/private/user/home/page-section";
import useAuth from "@/hooks/service/module/Auth/useAuth";

const HomeAdminContainer = () => {
  const service = useAuth();
  const logoutMutate = service.mutation.logout();

  const handleLogout = () => {
    logoutMutate.Logout();
  };
  return (
    <HomeUserSection
      service={{
        mutation: {
          isPending: logoutMutate.isPending,
          logout: handleLogout,
        },
      }}
    />
  );
};
export default HomeAdminContainer;

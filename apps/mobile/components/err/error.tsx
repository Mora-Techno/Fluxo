import { useAppNameSpace } from "@/hooks/costum/namespace";

export function Error(err: any) {
  const ns = useAppNameSpace();

  ns.alert.toast({
    title: "App Error",
    icon: "error",
    message: err,
  });
  console.log(err);
}

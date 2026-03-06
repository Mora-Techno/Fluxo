import "@/styles/global.css";
import "@/utils/Axios.client";
import { AppProviders } from "./provinder";
import { RootLayoutContent } from "./screen.stack";

export default function RootLayout() {
  return (
    <AppProviders>
      <RootLayoutContent />
    </AppProviders>
  );
}

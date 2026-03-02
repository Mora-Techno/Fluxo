import "@/styles/global.css";
import { AppProviders } from "./provinder";
import { RootLayoutContent } from "./screen.stack";

export default function RootLayout() {
  return (
    <AppProviders>
      <RootLayoutContent />
    </AppProviders>
  );
}

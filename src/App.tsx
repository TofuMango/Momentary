import RootRoute from "@/root-route";
import SessionProvider from "./hooks/provider/session-provider";

export default function App() {
  return (
    <SessionProvider>
      <RootRoute />
    </SessionProvider>
  );
}

import RootRoute from "@/root-route";
import SessionProvider from "./hooks/provider/session-provider";
import ModalProvider from "./hooks/provider/modal-provider";

export default function App() {
  return (
    <SessionProvider>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
    </SessionProvider>
  );
}

import GlobalLoader from "@/components/global-loader";
import { supabase } from "@/lib/supabase";
import { useSetSession, useIsSessionLoaded } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // 최초 한번은 실행됨(세션 데이터가 없어도)
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;

  return children;
}

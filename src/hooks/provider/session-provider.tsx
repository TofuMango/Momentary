import GlobalLoader from "@/components/global-loader";
import { supabase } from "@/lib/supabase";
import { useSetSession, useIsSessionLoaded, useSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";
import { useProfileData } from "../queries/use-profile-data";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { data: profile, isLoading: isProfileLoading } = useProfileData(
    session?.user.id,
  );

  

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // 최초 한번은 실행됨(세션 데이터가 없어도)
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;

  return children;
}

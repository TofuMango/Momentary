// export default function IndexPage() {
//   return <div>IndexPage</div>;
// }

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function IndexPage() {
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      console.log("USER:", data.user);
      console.log("EMAIL:", data.user?.email);
      console.log("PROVIDERS:", data.user?.app_metadata?.providers);
      console.log("IDENTITIES:", data.user?.identities);
      console.log("ERROR:", error);
    };

    checkUser();
  }, []);

  return <div>홈</div>;
}

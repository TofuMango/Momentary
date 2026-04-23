import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export function useProfileData(userId?: string) {
  const session = useSession();
  // 로그인된 사용자이고, 현재 userId가 세션의 user id와 같으면 나의 프로필
  // 즉, 지금 보고 있는 프로필이 로그인한 유저와 같은지 판단
  const isMine = userId === session?.user.id;

  return useQuery({
    // userId가 null 값이 아니라고 단언.
    // enabled 옵션으로 userId가 없을 경우 query function이 호출이 안되도록 설정해 뒀기 때문
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      // 유저의 프로필 가져옴
      try {
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        // 없으면 생성해서 반환
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          return await createProfile(userId!);
        }
        // 그외 error는 그대로 던짐
        throw error;
      }
    },
    enabled: !!userId,
  });
}

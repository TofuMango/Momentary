import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  isLoaded: boolean;
  session: Session | null;
};

const initialState = {
  isLoaded: false,
  session: null,
} as State;

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSession: (session: Session | null) => {
          set({ session, isLoaded: true });
        },
      },
    })),
    {
      name: "sessionStore",
    },
  ),
);

// 현재 로그인 세션 값만 구독하는 훅 (session 변경 시에만 리렌더)
export const useSession = () => {
  return useSessionStore((store) => store.session);
};

// 세션 로딩 완료 여부를 구독하는 훅 (초기 auth 체크 완료 여부 판단용)
export const useIsSessionLoaded = () => {
  return useSessionStore((store) => store.isLoaded);
};

// session 상태를 업데이트하는 액션 함수만 가져오는 훅
export const useSetSession = () => {
  return useSessionStore((store) => store.actions.setSession);
};

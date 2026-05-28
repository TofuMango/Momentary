import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type CloseState = {
  isOpen: false;
};

type OpenState = {
  isOpen: true;
  title: string;
  description: string;
  onPositive?: () => void; //확인버튼 눌렀을때 호출할 콜백함수
  onNegative?: () => void;
};

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

const useAlertModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (params: Omit<OpenState, "isOpen">) => {
          set({ ...params, isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "useAlertModalStore" },
  ),
);

export const useOpenAlertModal = () => {
  const open = useAlertModalStore((store) => store.actions.open);
  return open;
};

export const useAlertModal = () => {
  const store = useAlertModalStore();
  return store as typeof store & State;
};


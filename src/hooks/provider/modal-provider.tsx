import PostEditorModal from "@/components/modal/post-editor-modal";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <PostEditorModal />,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}

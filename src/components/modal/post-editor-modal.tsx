import { ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useEffect, useRef, useState } from "react";

export default function PostEditorModal() {
  const { isOpen, close } = usePostEditorModal();
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCloseModal = () => {
    close();
  };

  useEffect(() => {
    if (textareaRef.current) {
      // 컨텐츠를 입력하거나 삭제할때마다 높이 초기화
      textareaRef.current.style.height = "auto";
      // 현재 스크롤 높이로 늘려줌
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
    // 텍스트가 바뀔때만 실행
  }, [content]);

  // modal이 열릴때 textarea에 focus
  // Radix 쪽에서 첫번째 요소에 자동 focus 되므로 사실 없어도 되는 코드...
  useEffect(() => {
    // false -> modal 닫힌상태는 return 으로 종료
    if (!isOpen) return;
    textareaRef.current?.focus();
    // 입력값 초기화
    setContent("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="무슨일이 있었나요?"
        />
        <Button variant={"outline"} className="cursor-pointer">
          <ImageIcon />
          이미지 추가
        </Button>
        <Button className="cursor-pointer">저장</Button>
      </DialogContent>
    </Dialog>
  );
}

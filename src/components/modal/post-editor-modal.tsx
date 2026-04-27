import { ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useEffect, useRef, useState } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { toast } from "sonner";

export default function PostEditorModal() {
  const { isOpen, close } = usePostEditorModal();
  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    // 포스트 생성에 성공하면 modal close
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      toast.error("포스트 생성에 실패했습니다.");
    },
  });

  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCloseModal = () => {
    close();
  };

  // 포스트 생성 요청
  const handleCreatePostClick = () => {
    // content가 공백일 경우 그냥 return
    if (content.trim() === "") return;
    createPost(content);
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
          disabled={isCreatePostPending}
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
        <Button
          disabled={isCreatePostPending}
          onClick={handleCreatePostClick}
          className="cursor-pointer"
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}

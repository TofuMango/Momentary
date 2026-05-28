import { ImageIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useSession } from "@/store/session";
import { useOpenAlertModal } from "@/store/alert-modal";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const session = useSession();
  const { isOpen, close } = usePostEditorModal();
  const openAlertModal = useOpenAlertModal();

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
  const [images, setImages] = useState<Image[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCloseModal = () => {
    if (content !== "" || images.length !== 0) {
      // AllertModal
      openAlertModal({
        title: "게시글 작성이 완료되지 않았습니다.",
        description: "이 화면을 나가면 작성하던 내용이 사라집니다.",
        onPositive: () => {
          close();
        },
      });

      return;
    }
    close();
  };

  // 포스트 생성 요청

  const handleCreatePostClick = () => {
    // content가 공백일 경우 그냥 return
    if (content.trim() === "") return;
    createPost({
      content,
      images: images.map((image) => image.file),
      userId: session!.user.id,
    });
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    // 같은 파일 재선택 가능하도록 input 초기화
    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );
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
    setImages([]);
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
        <input
          onChange={handleSelectImages}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      className="h-full w-full rounded-sm object-cover"
                    />
                    <div
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <Button
          onClick={() => {
            fileInputRef.current?.click();
          }}
          disabled={isCreatePostPending}
          variant={"outline"}
          className="cursor-pointer"
        >
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import kakaoLogo from "@/assets/kakao-mark.svg";
import googlLogo from "@/assets/google-mark.svg";
import { useSignInWithOAuth } from "@/hooks/mutations/use-sign-in-with-oauth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword } = useSignInWithPassword();
  const { mutate: signInWithOAuth } = useSignInWithOAuth();

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  const handleSignInWithGithubClick = () => {
    signInWithOAuth("github");
  };

  const handleSignInWithKakaoClick = () => {
    signInWithOAuth("kakao");
  };

  const handleSignInWithGoogleClick = () => {
    signInWithOAuth("google");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@google.com"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={handleSignInWithPasswordClick} className="w-full">
          로그인
        </Button>
        <Button
          className="w-full"
          onClick={handleSignInWithGithubClick}
          variant={"outline"}
        >
          <img src={gitHubLogo} className="h-4 w-4" />
          Github 계정으로 로그인
        </Button>
        <Button
          className="flex w-full items-center gap-2 bg-[#FEE500] text-black hover:bg-[#fada0a]"
          onClick={handleSignInWithKakaoClick}
        >
          <img src={kakaoLogo} className="h-4 w-4" />
          Kakao 계정으로 로그인
        </Button>
        <Button
          className="flex w-full items-center gap-2 border bg-white text-black hover:bg-gray-100"
          onClick={handleSignInWithGoogleClick}
        >
          <img src={googlLogo} className="h-4 w-4" />
          Google 계정으로 로그인
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          계정이 없으신가요? 회원가입
        </Link>
      </div>
    </div>
  );
}

import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";
import defaultAvatar from "@/assets/default-avatar.png";
import { SunIcon } from "lucide-react";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-175 justify-between">
          <Link to={"/"} className="flex items-center gap-2">
            <img
              className="h-5"
              src={logo}
              alt="서로 다른 형태의 요소들이 만나 하나의 순간을 이루는 모습을 형상화한 모양"
            />
            <div className="font-bold">Momentary</div>
          </Link>

          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <img className="h-6" src={defaultAvatar} />
          </div>
        </div>
      </header>

      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-5">
        <Outlet /> {/* 페이지 컴포넌트가 실제로 렌더링 될 위치 지정*/}
      </main>
      <footer className="py10 text-muted-foreground border-t text-center">
        Copyright 2026. TofuMango All rights reserved.
      </footer>
    </div>
  );
}

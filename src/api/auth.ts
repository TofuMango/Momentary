import { supabase } from "@/lib/supabase";

// 회원가입 요청
export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // supabase 서버에 요청
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// 로그인 요청
export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

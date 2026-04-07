import { supabase } from "@/lib/supabase";

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

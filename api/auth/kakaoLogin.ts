import { createClient } from "@/utils/supabase/client";

export const onKakaoLogin = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  console.log("KAKAO LOGIN - ", data);
};

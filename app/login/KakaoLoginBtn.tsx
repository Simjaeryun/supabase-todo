"use client";

import { onKakaoLogin } from "@/api/auth/kakaoLogin";

export default function KakaoLoginBtn() {
  return (
    <div className="bg-yellow-400 p-5" onClick={onKakaoLogin}>
      카카오 로그인하기
    </div>
  );
}

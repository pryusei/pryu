"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "../components/Button";  // Buttonコンポーネントをインポート

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <>
          <p>こんにちは、{session.user?.name}さん</p>
          <Button onClick={() => signOut()} label="ログアウト" className="mt-4" />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            <Link href="/workouts" className="block bg-gray-200 p-4 rounded text-center">
              筋トレ記録ページ
            </Link>
            <Link href="/recommend" className="block bg-gray-200 p-4 rounded text-center">
              AI種目提案ページ
            </Link>
            <Link href="/max-progress" className="block bg-gray-200 p-4 rounded text-center">
              部位ごとのマックス記録推移
            </Link>
          </div>
        </>
      ) : (
        <Button onClick={() => signIn("google")} label="Googleでログイン" />
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">筋トレ記録アプリ</h1>

      {session ? (
        <>
          <p className="text-lg">こんにちは、{session.user?.name} さん！</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          >
            ログアウト
          </button>
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
        <>
          <p className="text-lg">ログインして始めましょう！</p>
          <Link href="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
              ログインページへ
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
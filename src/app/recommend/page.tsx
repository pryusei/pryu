"use client";

import React, { useState } from "react";
import Button from "../components/Button";  // Buttonコンポーネントをインポート

export default function RecommendPage() {
  const [bodyPart, setBodyPart] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!bodyPart) return;

    setLoading(true);
    setSuggestions("");

    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bodyPart }),
    });

    const data = await response.json();
    setSuggestions(data.suggestions);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">AI 筋トレ種目提案</h1>
      <input 
        type="text" 
        placeholder="鍛えたい部位を入力 (例: 胸, 背中)" 
        value={bodyPart} 
        onChange={(e) => setBodyPart(e.target.value)} 
        className="border p-2 m-2"
      />
      <Button onClick={handleRecommend} disabled={loading} className="bg-blue-500 text-white p-2 rounded">
        {loading ? "提案中..." : "AI に提案してもらう"}
      </Button>

      {suggestions && (
        <div className="mt-4 p-4 border">
          <h2 className="text-lg font-bold">提案された種目</h2>
          <p>{suggestions}</p>
        </div>
      )}
    </div>
  );
}

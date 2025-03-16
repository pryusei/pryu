"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export default function MaxProgressPage() {
  const { data: session } = useSession();
  const [bodyPart, setBodyPart] = useState("");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMaxProgress = async () => {
    if (!bodyPart || !session?.user?.email) return;

    setLoading(true);

    const response = await fetch(`/api/max-progress?user=${session.user.email}&bodyPart=${bodyPart}`);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      setChartData({
        labels: data.map((record) => record.date),
        datasets: [
          {
            label: `${bodyPart} の最大重量推移`,
            data: data.map((record) => record.weight),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      });
    } else {
      setChartData(null);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">部位ごとのマックス記録推移</h1>
      <input
        type="text"
        placeholder="部位を入力 (例: ベンチプレス, デッドリフト)"
        value={bodyPart}
        onChange={(e) => setBodyPart(e.target.value)}
        className="border p-2 m-2"
      />
      <button onClick={fetchMaxProgress} disabled={loading} className="bg-blue-500 text-white p-2 rounded">
        {loading ? "取得中..." : "データ取得"}
      </button>

      {chartData ? (
        <div className="mt-4 w-full max-w-lg">
          <Line data={chartData} />
        </div>
      ) : (
        <p className="mt-4">データがありません。</p>
      )}
    </div>
  );
}
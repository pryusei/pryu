"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useSession } from "next-auth/react";

interface Workout {
  id: string;
  exercise: string;
  weight: number;
  user: string;
  createdAt: Date;
}

export default function WorkoutsPage() {
  const { data: session } = useSession();
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    if (session) {
      fetchWorkouts();
    }
  }, [session]);

  const fetchWorkouts = async () => {
    const querySnapshot = await getDocs(collection(db, "workouts"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Workout));
    setWorkouts(data);
  };

  const addWorkout = async () => {
    if (!exercise || !weight) return;
    await addDoc(collection(db, "workouts"), {
      user: session?.user?.email,
      exercise,
      weight: Number(weight),
      createdAt: new Date(),
    });
    setExercise("");
    setWeight("");
    fetchWorkouts();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">筋トレ記録</h1>
      {session ? (
        <>
          <input 
            type="text" 
            placeholder="種目名 (例: ベンチプレス)" 
            value={exercise} 
            onChange={(e) => setExercise(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="重量 (kg)" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
          />
          <button onClick={addWorkout}>追加</button>

          <h2 className="mt-4">記録一覧</h2>
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id}>{workout.exercise} - {workout.weight}kg</li>
            ))}
          </ul>
        </>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
}
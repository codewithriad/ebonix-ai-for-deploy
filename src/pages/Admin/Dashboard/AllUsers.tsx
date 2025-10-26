import { db } from "@/firebase.config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  verified: boolean;
  createdAt: string;
}

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData: User[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          role: data.role,
          status: data.status,
          verified: data.verified,
          createdAt:
            data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        };
      });
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow divide-y">
        {users.map((user) => (
          <div key={user.id} className="flex justify-between items-center p-3">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <p className="px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                {user.role}
              </p>
              <p className="px-2 py-0.5 rounded bg-green-200 text-green-800">
                {user.status}
              </p>
              <button className="px-2 py-0.5 rounded bg-blue-500 text-white">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

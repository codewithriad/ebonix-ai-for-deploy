import { db } from "@/firebase.config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  initials: string;
}

export default function UsersCard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData: User[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          status: data.status,
          createdAt:
            data.createdAt?.toDate().toISOString() || new Date().toISOString(),
          initials: data.name ? data.name.charAt(0).toUpperCase() : "U",
        };
      });
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl w-full">
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-sm">
                {user.initials}
              </div>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            </div>
            <span className="text-xs text-white bg-gray-900 px-2 py-0.5 rounded-full">
              {user.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

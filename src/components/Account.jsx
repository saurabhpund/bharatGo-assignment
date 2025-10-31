import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseConfig";

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Failed to get user:", error.message);
        return;
      }
      setUser(data.user); // data.user contains {id, email, etc.}
    };

    fetchUser();
  }, []);

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
        <h2 className="text-2xl font-semibold mb-2">No account info found</h2>
        <p>Please log in to view your account details.</p>
      </div>
    );

  return (
    <section className="container mx-auto max-w-md mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">My Account</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-white">
          {user.email.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <div className="w-full space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          {/* If you want more fields like phone/address, you need to fetch from your own table */}
        </div>
      </div>
    </section>
  );
};

export default Account;

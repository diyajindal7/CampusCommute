import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

function Profile() {

  const [user, setUser] =
    useState(null);

  const [stats, setStats] =
    useState({
      ridesCreated: 0,
      requestsReceived: 0,
    });

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const email =
          localStorage.getItem(
            "userEmail"
          );

        const response =
          await axios.get(
            `http://13.60.99.228:5000/api/auth/profile/${email}`
          );

        setUser(
          response.data
        );

        const statsResponse =
          await axios.get(
            `http://13.60.99.228:5000/api/rides/profile-stats/${email}`
          );

        setStats(
          statsResponse.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  if (!user) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071326] text-white">
        Loading...
      </div>
    );

  }

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#071326] via-[#0a1830] to-[#10213f] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="mb-8">

          <p className="text-green-400">
            Student Profile
          </p>

          <h1 className="text-5xl font-bold">
            Profile 👤
          </h1>

        </div>

        <div className="max-w-4xl bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-2xl p-8">

          <div className="flex items-center gap-6 mb-8">
<div
  className="
    w-24
    h-24
    rounded-full
bg-slate-900 border border-green-500
    flex
    items-center
    justify-center
    text-4xl
    font-bold
  "
>
  {user.name?.[0]?.toUpperCase()}
</div>

            <div>

              <h2 className="text-3xl font-bold">
                {user.name}
              </h2>

              <p className="text-slate-400 mt-1">
                {user.email}
              </p>

              <div className="flex gap-3 mt-3">

                {user.role === "admin" ? (

                  <span className="bg-yellow-600 px-3 py-1 rounded-full">
                    👑 Admin
                  </span>

                ) : (

                  <span className="bg-blue-600 px-3 py-1 rounded-full">
                    🎓 Student
                  </span>

                )}

                {user.isVerified && (

<span className="bg-green-600/20 border border-green-500 text-green-400 px-3 py-1 rounded-full">                    ✅ Verified
                  </span>

                )}

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-8">

            <div className="bg-slate-800 p-5 rounded-xl">

              <p className="text-slate-400">
                🚗 Rides Created
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.ridesCreated}
              </h2>

            </div>

            <div className="bg-slate-800 p-5 rounded-xl">

              <p className="text-slate-400">
                📩 Requests Received
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.requestsReceived}
              </h2>

            </div>

          </div>

<div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-green-500 transition-all">
  
            <h3 className="text-xl font-bold mb-4">
              Account Information
            </h3>

            <div className="space-y-3">

              <p>
                <strong>Email:</strong>
                {" "}
                {user.email}
              </p>

              <p>
                <strong>Status:</strong>
                {" "}
                {user.isVerified
                  ? "Verified"
                  : "Not Verified"}
              </p>

              <p>
                <strong>Member Since:</strong>
                {" "}
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </p>

              <p className="text-slate-300">
  🎓 Role: {user.role === "admin" ? "Admin" : "Student"}
</p>

<p className="text-slate-300">
  🕒 Last Login: Today
</p>



            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;
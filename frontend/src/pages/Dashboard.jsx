import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {

  const [rideCount, setRideCount] =
    useState(0);

  const [requestCount, setRequestCount] =
    useState(0);

  const [userName, setUserName] =
    useState("");

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        const email =
          localStorage.getItem(
            "userEmail"
          );

        const profileResponse =
          await axios.get(
            `http://13.60.99.228:5000/api/auth/profile/${email}`
          );

        setUserName(
          profileResponse.data.name
        );

        const response =
          await axios.get(
            `http://13.60.99.228:5000/api/rides/myrides/${email}`
          );

        const rides =
          response.data;

        setRideCount(
          rides.length
        );

        let totalRequests = 0;

        rides.forEach(
          (ride) => {

            totalRequests +=
              ride.requests.length;

          }
        );

        setRequestCount(
          totalRequests
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#071326] via-[#0a1830] to-[#10213f] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* HERO SECTION */}

<div className="bg-slate-900 border border-green-500 rounded-3xl p-8 mb-8 shadow-xl hover:shadow-green-500/20 transition-all duration-300">
          <h1 className="text-5xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-xl mt-3">
            {userName}
          </p>

          <p className="mt-2 text-white/80">
            Manage rides, requests and lobbies from one place.
          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

<motion.div
  whileHover={{ scale: 1.05 }}
  className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-6 rounded-2xl hover:border-green-500 transition-all duration-300"
>
            <p className="text-slate-400">
              🚗 Active Rides
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {rideCount}
            </h2>

          </motion.div>

<motion.div
  whileHover={{
    scale: 1.03,
  }}
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.3,
  }}
  className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-6 rounded-2xl hover:border-green-500 transition-all"
>

            <p className="text-slate-400">
              💬 Lobbies
            </p>

            <h2 className="text-4xl font-bold mt-2">
              0
            </h2>

          </motion.div>

<motion.div
  whileHover={{ scale: 1.05 }}
  className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-6 rounded-2xl hover:border-green-500 transition-all duration-300"
>
            <p className="text-slate-400">
              📩 Requests
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {requestCount}
            </h2>

          </motion.div>

<motion.div
  whileHover={{ scale: 1.05 }}
  className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-6 rounded-2xl hover:border-green-500 transition-all duration-300"
>
            <p className="text-slate-400">
              👤 Profile
            </p>

            <h2 className="text-4xl font-bold mt-2">
              ✓
            </h2>

          </motion.div>

        </div>

        {/* QUICK ACTIONS */}

        <h2 className="text-2xl font-bold mb-5">
          Quick Actions ⚡
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            to="/create-ride"
className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 hover:border-green-500 hover:scale-105 transition-all duration-300"          >
            <h3 className="text-xl font-bold">
              🚗 Create Ride
            </h3>

            <p className="text-slate-400 mt-2">
              Offer a ride to fellow students.
            </p>
          </Link>

          <Link
            to="/browse"
className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 hover:border-green-500 hover:scale-105 transition-all duration-300"          >
            <h3 className="text-xl font-bold">
              🔍 Browse Rides
            </h3>

            <p className="text-slate-400 mt-2">
              Find available rides.
            </p>
          </Link>

          <Link
            to="/browse-lobbies"
className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 hover:border-green-500 hover:scale-105 transition-all duration-300"          >
            <h3 className="text-xl font-bold">
              💬 Browse Lobbies
            </h3>

            <p className="text-slate-400 mt-2">
              Join student discussions.
            </p>
          </Link>

        </div>


<div className="mt-10">

  <h2 className="text-2xl font-bold mb-5">
    Recent Activity 📈
  </h2>

  <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6">

    <ul className="space-y-4 text-slate-300">

      <li>✅ Logged into CampusCommute</li>

      <li>🚗 Created Ride</li>

      <li>📩 Received Ride Requests</li>

      <li>💬 Joined Lobby Discussions</li>

    </ul>

  </div>

</div>

        

      </div>

  </div>

  );

}

export default Dashboard;
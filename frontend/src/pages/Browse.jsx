import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Browse() {

  const [search, setSearch] =
    useState("");

  const [rides, setRides] =
    useState([]);

  useEffect(() => {

    fetchRides();

  }, []);

  const fetchRides = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/rides"
        );

      setRides(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const joinRide = async (
    rideId
  ) => {

    try {

      await axios.post(
        `http://localhost:5000/api/rides/${rideId}/join`,
        {
          email:
            localStorage.getItem(
              "userEmail"
            ),
        }
      );

toast.success(
  "Ride Request Sent 🚗"
);
    } catch (error) {
      toast.error(
  "Failed to send request"
);

      console.log(error);

    }

  };

  const filteredRides =
    rides.filter((ride) =>
      ride.destination
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

  <div className="flex min-h-screen bg-gradient-to-br from-[#071326] via-[#0a1830] to-[#10213f] text-white">

    <Sidebar />

    <div className="flex-1 p-8">

      <div className="mb-8">

        <p className="text-green-400">
          CampusCommute Marketplace
        </p>

        <h1 className="text-5xl font-bold">
          Browse Rides 🚗
        </h1>

        <p className="text-slate-400 mt-2">
          Find rides shared by verified students.
        </p>

      </div>

      <input
        type="text"
        placeholder="🔍 Search Destination..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          bg-slate-900/60
          border
          border-slate-700
          p-4
          rounded-2xl
          mb-8
          outline-none
          focus:border-green-500
        "
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredRides.map((ride) => (

          <motion.div
  key={ride._id}
  whileHover={{
    scale: 1.03,
  }}
  whileTap={{
    scale: 0.98,
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
  className="
    bg-slate-900/60
    backdrop-blur-md
    border
    border-slate-700
    rounded-2xl
    p-6
    shadow-lg
  "
>

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold">
                  🚗 {ride.destination}
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Shared Ride
                </p>

              </div>

              {ride.seats > 0 ? (

                <span className="bg-slate-900 border border-green-500bg-slate-900 border border-green-500 px-3 py-1 rounded-full text-sm">
                  Open
                </span>

              ) : (

                <span className="bg-gradient-to-r from-red-500 to-red-700 px-3 py-1 rounded-full text-sm">
                  FULL
                </span>

              )}

            </div>

            <div className="mt-5 space-y-2">

              <p>
  📅 {
    new Date(
      ride.date
    ).toLocaleDateString()
  }
</p>

              <p>
                👥 {ride.seats} Seats Left
              </p>

              <p className="truncate">
                👤 {ride.createdBy}
              </p>

            </div>

            <button
              disabled={ride.seats === 0}
              onClick={() =>
                joinRide(ride._id)
              }
              className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all ${
                ride.seats === 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-slate-900 border border-green-500bg-slate-900 border border-green-500 hover:bg-green-500"
              }`}
            >

              {ride.seats === 0
                ? "Ride Full"
                : "Join Ride"}

            </button>

          </motion.div>

        ))}

      </div>

    </div>

  </div>

);

}

export default Browse;
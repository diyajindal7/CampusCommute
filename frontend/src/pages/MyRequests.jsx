import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

function MyRequests() {

  const [requests, setRequests] =
    useState([]);

  useEffect(() => {

    fetchRequests();

  }, []);

  const fetchRequests =
    async () => {

      try {

        const email =
          localStorage.getItem(
            "userEmail"
          );

        const response =
          await axios.get(
            `http://13.60.99.228:5000/api/rides/requests/${email}`
          );

        setRequests(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#071326] via-[#0a1830] to-[#10213f] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="mb-8">

          <p className="text-green-400">
            CampusCommute
          </p>

          <h1 className="text-5xl font-bold">
            My Requests 📩
          </h1>

          <p className="text-slate-400 mt-2">
            Track all ride requests you have sent.
          </p>

        </div>

        {requests.length === 0 ? (

          <div className="bg-slate-900/60 p-10 rounded-2xl text-center">

            <h2 className="text-2xl font-bold">
              📭 No Requests Yet
            </h2>

            <p className="text-slate-400 mt-3">
              Join a ride and your requests will appear here.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {requests.map(
              (request) => (

                <motion.div
                  key={request.rideId}
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
                        🚗 {request.destination}
                      </h2>

                      <p className="text-slate-400 mt-1">
                        Ride Request
                      </p>

                    </div>

                    <span
                      className={
                        request.status === "accepted"
                          ? "bg-slate-900 border border-green-500bg-slate-900 border border-green-500 px-3 py-1 rounded-full text-sm"
                          : request.status === "rejected"
                          ? "bg-gradient-to-r from-red-500 to-red-700 px-3 py-1 rounded-full text-sm"
                          : "bg-yellow-600 px-3 py-1 rounded-full text-sm"
                      }
                    >
                      {request.status === "accepted"
                        ? "✅ Accepted"
                        : request.status === "rejected"
                        ? "❌ Rejected"
                        : "⏳ Pending"}
                    </span>

                  </div>

                  <div className="mt-5 space-y-2">

                    <p>
                      📅 {
                        new Date(
                          request.date
                        ).toLocaleDateString()
                      }
                    </p>

                    <p>
                      📌 Status:
                      {" "}
                      {request.status}
                    </p>

                  </div>

                </motion.div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default MyRequests;
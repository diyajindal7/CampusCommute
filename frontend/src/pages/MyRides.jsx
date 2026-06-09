import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

function MyRides() {

  const [rides, setRides] =
    useState([]);

  useEffect(() => {

    fetchMyRides();

  }, []);

  const fetchMyRides =
    async () => {

      try {

        const email =
          localStorage.getItem(
            "userEmail"
          );

        const response =
          await axios.get(
            `http://13.60.99.228:5000/api/rides/myrides/${email}`
          );

        setRides(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };


    const deleteRide = async (
  rideId
) => {

  if (
    !window.confirm(
      "Delete this ride?"
    )
  )
    return;

  try {

    await axios.delete(
      `http://13.60.99.228:5000/api/rides/${rideId}`
    );

    fetchMyRides();

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
            My Rides 🚗
          </h1>

          <p className="text-slate-400 mt-2">
            Manage rides you have created.
          </p>

        </div>








        {rides.length === 0 ? (

          <div className="bg-slate-900/60 p-10 rounded-2xl text-center">

            <h2 className="text-2xl font-bold">
              🚗 No Rides Yet
            </h2>

            <p className="text-slate-400 mt-3">
              Create your first ride and start sharing commutes.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {rides.map((ride) => (

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
  hover:border-green-500
  hover:shadow-green-500/10
  transition-all
"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      🚗 {ride.destination}
                    </h2>

                    <p className="text-slate-400 text-sm mt-1">
                      Ride Created
                    </p>

                  </div>

<span className="bg-green-600/20 border border-green-500 text-green-400 px-3 py-1 rounded-full text-sm">                    Active
                  </span>

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

                  <p>
                    📩 {ride.requests.length} Requests
                  </p>



                  <button
  onClick={() => deleteRide(ride._id)}
  className="
    mt-4
    w-full
    bg-red-600/80
    hover:bg-red-500
    py-2
    rounded-xl
    transition-all
  "
>
  Delete Ride
</button>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default MyRides;
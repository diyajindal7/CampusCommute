import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Requests() {

  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {

    try {

      const email = localStorage.getItem("userEmail");

      const response = await axios.get(
        `http://localhost:5000/api/rides/myrides/${email}`
      );

      setRides(response.data);

    } catch (error) {

      console.log(error);

    }

  };


const updateRequest = async (
  rideId,
  requestId,
  status
) => {

  try {

    await axios.put(
      `http://localhost:5000/api/rides/${rideId}/request/${requestId}`,
      { status }
    );

    fetchRequests();

  } catch (error) {

    console.log(error);

  }

};


  return (
    <div className="flex min-h-screen bg-[#071326] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-6">
          Ride Requests
        </h1>

        {rides.map((ride) => (

          <div
            key={ride._id}
            className="bg-slate-900 p-5 rounded-xl mb-6"
          >

            <h2 className="text-xl font-bold">
              {ride.destination}
            </h2>

            <p className="text-green-400 mt-1">
  Seats Remaining: {ride.seats}
</p>

            <div className="mt-4">

              {ride.requests.map((request, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center border-b border-slate-700 py-3"
                >

                  <span>
                    {request.email}
                  </span>

                  <div className="flex gap-2">

{request.status === "pending" ? (

  <div className="flex gap-2">

    <button
      onClick={() =>
        updateRequest(
          ride._id,
          request._id,
          "accepted"
        )
      }
      className="bg-slate-900 border border-green-500bg-slate-900 border border-green-500 px-3 py-1 rounded"
    >
      Accept
    </button>

    <button
      onClick={() =>
        updateRequest(
          ride._id,
          request._id,
          "rejected"
        )
      }
      className="bg-gradient-to-r from-red-500 to-red-700 px-3 py-1 rounded"
    >
      Reject
    </button>

  </div>

) : (

  <span
    className={
      request.status === "accepted"
        ? "text-green-400"
        : "text-red-400"
    }
  >
    {request.status}
  </span>

)}

</div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Requests;
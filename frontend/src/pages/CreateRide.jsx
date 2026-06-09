import { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";


function CreateRide() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState("");
  const [vehicle, setVehicle] = useState("Bike");
  const [fare, setFare] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] =
  useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!destination || !date || !seats) {
      alert("Please fill all fields");
      return;
    }
setLoading(true);
    try {
      
      await axios.post(
        "http://13.60.99.228:5000/api/rides/create",
        {
          destination,
          date,
          seats,
          createdBy:
            localStorage.getItem(
              "userEmail"
            ),
        }
      );

toast.success(
  "Ride Created Successfully 🚗"
);
setLoading(false);
      setDestination("");
      setDate("");
      setSeats("");
      setFare("");
      setNotes("");

    } catch (error) {
      setLoading(false);
      toast.error(
  "Failed to create ride"
);

console.log(error);
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#071326] via-[#0a1830] to-[#10213f] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="mb-8">

          <p className="text-green-400 text-sm">
            CampusCommute Ride Sharing
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Create New Ride 🚗
          </h1>

          <p className="text-slate-400 mt-2">
            Share your ride with verified students.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-2xl p-8"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="text-sm text-slate-400">
                Vehicle Type
              </label>

              <select
                value={vehicle}
                onChange={(e) =>
                  setVehicle(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 p-3 rounded-lg mt-2"
              >
                <option>Bike</option>
                <option>Scooter</option>
                <option>Car</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Available Seats
              </label>

              <input
                type="number"
                min="1"
                max="8"
                value={seats}
                onChange={(e) =>
                  setSeats(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 p-3 rounded-lg mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-slate-400">
                Destination
              </label>

              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) =>
                  setDestination(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 p-3 rounded-lg mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Departure Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 p-3 rounded-lg mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Cost Per Seat (₹)
              </label>

              <input
                type="number"
                placeholder="Optional"
                value={fare}
                onChange={(e) =>
                  setFare(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 p-3 rounded-lg mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-slate-400">
                Notes
              </label>

              <textarea
                rows="4"
                placeholder="Pickup point, luggage info, route details..."
                value={notes}
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 p-3 rounded-lg mt-2"
              />
            </div>

          </div>

          <div className="mt-8 bg-teal-900/30 border border-teal-700 rounded-xl p-5">

            <h2 className="font-bold text-lg mb-3">
              Ride Preview
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <div>
                <p className="text-slate-400 text-sm">
                  Vehicle
                </p>

                <p className="font-bold">
                  {vehicle}
                </p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">
                  Seats
                </p>

                <p className="font-bold">
                  {seats || 0}
                </p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">
                  Fare
                </p>

                <p className="font-bold">
                  ₹{fare || 0}
                </p>
              </div>

            </div>

          </div>

          <div className="flex gap-3 mt-8">

            <button
  type="submit"
  disabled={loading}
  className="
    bg-slate-900 border border-green-500bg-slate-900 border border-green-500
    px-6
    py-3
    rounded-lg
    disabled:opacity-50
  "
>
  {loading
    ? "Creating..."
    : "Create Ride"}
</button>

            <button
              type="reset"
              className="bg-slate-800 hover:bg-gradient-to-r
from-green-600/20
to-emerald-600/20
border
border-green-500 px-8 py-3 rounded-xl transition-all"
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateRide;
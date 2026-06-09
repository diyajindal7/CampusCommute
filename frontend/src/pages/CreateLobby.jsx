import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
function CreateLobby() {

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [type, setType] = useState("Ride Share");
  const [maxMembers, setMaxMembers] = useState(4);
  const [description, setDescription] = useState("");
const [loading, setLoading] =
  useState(false);
  const createLobby = async () => {

    try {

      const createdBy =
        localStorage.getItem(
          "userEmail"
        );
        setLoading(true);

      const response =
        await axios.post(
          "http://13.60.99.228:5000/api/lobbies/create",
          {
            title,
            destination,
            createdBy,
          }
        );

      if (
        response.data.success
      ) {

       toast.success(
  "Lobby Created 🎉"
);
setLoading(false);
        setTitle("");
        setDestination("");
        setDescription("");
        setMaxMembers(4);

      }

    } catch (error) {
setLoading(false);
      console.log(error);

     toast.error(
  "Failed to create lobby"
);

    }

  };

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#071326] via-[#0a1830] to-[#10213f] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="mb-8">

          <p className="text-green-400 text-sm">
            CampusCommute Community
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Create Lobby 💬
          </h1>

          <p className="text-slate-400 mt-2">
            Create a discussion or ride-sharing group.
          </p>

        </div>

        <div className="max-w-4xl bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-2xl p-8">

          <div className="grid md:grid-cols-2 gap-5">

            <div className="md:col-span-2">

              <label className="text-sm text-slate-400">
                Lobby Title
              </label>

              <input
                type="text"
                placeholder="Morning Ride to NIE"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 p-3 rounded-lg mt-2"
              />

            </div>

            <div>

              <label className="text-sm text-slate-400">
                Lobby Type
              </label>

              <select
                value={type}
                onChange={(e) =>
                  setType(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 p-3 rounded-lg mt-2"
              >
                <option>
                  Ride Share
                </option>

                <option>
                  Discussion
                </option>

                <option>
                  Event
                </option>

                <option>
                  General
                </option>

              </select>

            </div>

            <div>

              <label className="text-sm text-slate-400">
                Max Members
              </label>

              <input
                type="number"
                min="2"
                max="50"
                value={maxMembers}
                onChange={(e) =>
                  setMaxMembers(
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
                placeholder="NIE South Campus"
                value={destination}
                onChange={(e) =>
                  setDestination(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 p-3 rounded-lg mt-2"
              />

            </div>

            <div className="md:col-span-2">

              <label className="text-sm text-slate-400">
                Description
              </label>

              <textarea
                rows="4"
                placeholder="Add lobby details..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 p-3 rounded-lg mt-2"
              />

            </div>

          </div>

          <div className="mt-8 bg-teal-900/30 border border-teal-700 rounded-xl p-5">

            <h2 className="font-bold text-lg mb-3">
              Lobby Preview
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <div>

                <p className="text-slate-400 text-sm">
                  Type
                </p>

                <p className="font-bold">
                  {type}
                </p>

              </div>

              <div>

                <p className="text-slate-400 text-sm">
                  Members
                </p>

                <p className="font-bold">
                  1 / {maxMembers}
                </p>

              </div>

              <div>

                <p className="text-slate-400 text-sm">
                  Destination
                </p>

                <p className="font-bold">
                  {destination || "-"}
                </p>

              </div>

            </div>

          </div>

          <div className="flex gap-3 mt-8">

            <button
              onClick={createLobby}
              className="bg-slate-900 border border-green-500bg-slate-900 border border-green-500 hover:bg-green-500 px-8 py-3 rounded-xl font-semibold transition-all"
            >
              {loading
 ? "Creating..."
 : "Create Lobby"}
            </button>

            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDestination("");
                setDescription("");
                setMaxMembers(4);
              }}
              className="bg-slate-800 hover:bg-gradient-to-r
from-green-600/20
to-emerald-600/20
border
border-green-500 px-8 py-3 rounded-xl transition-all"
            >
              Reset
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CreateLobby;
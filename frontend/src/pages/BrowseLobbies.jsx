import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function BrowseLobbies() {

  const navigate =
    useNavigate();

  const [lobbies, setLobbies] =
    useState([]);

  useEffect(() => {

    fetchLobbies();

  }, []);

  const fetchLobbies =
    async () => {

      try {

        const response =
          await axios.get(
            "http://13.60.99.228:5000/api/lobbies"
          );

        setLobbies(
          response.data
        );

      } catch (error) {
toast.error(
  "Something went wrong"
);
        console.log(error);

      }

    };

  const joinLobby =
    async (lobbyId) => {

      try {

        const email =
          localStorage.getItem(
            "userEmail"
          );

        await axios.post(
          `http://13.60.99.228:5000/api/lobbies/${lobbyId}/join`,
          { email }
        );

       toast.success(
  "Joined Lobby 🎉"
);
        fetchLobbies();

      } catch (error) {
        toast.error(
  "Something went wrong"
);

        console.log(error);

      }

    };

  const leaveLobby =
    async (lobbyId) => {

      try {

        const email =
          localStorage.getItem(
            "userEmail"
          );

        await axios.post(
          `http://13.60.99.228:5000/api/lobbies/${lobbyId}/leave`,
          { email }
        );

        toast.success(
  "Left Lobby"
);

        fetchLobbies();

      } catch (error) {
toast.error(
  "Something went wrong"
);
        console.log(error);

      }

    };

  const reportLobby =
    async (lobbyId) => {

      try {

        await axios.post(
          "http://13.60.99.228:5000/api/reports",
          {
            reportedBy:
              localStorage.getItem(
                "userEmail"
              ),

            targetId:
              lobbyId,

            type:
              "lobby",

            reason:
              "Reported by user",
          }
        );

      toast.success(
  "Lobby Reported 🚩"
);

      } catch (error) {
toast.error(
  "Something went wrong"
);
        console.log(error);

      }

    };

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#071326] via-[#0a1830] to-[#10213f] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="mb-8">

          <p className="text-green-400">
            CampusCommute Communities
          </p>

          <h1 className="text-5xl font-bold">
            Browse Lobbies 💬
          </h1>

          <p className="text-slate-400 mt-2">
            Join conversations and ride groups.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {lobbies.map(
            (lobby) => {

              const userEmail =
                localStorage.getItem(
                  "userEmail"
                );

              const isMember =
                lobby.members.includes(
                  userEmail
                );

              return (

                <motion.div
  key={lobby._id}
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

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-2xl font-bold">
                        💬 {lobby.title}
                      </h2>

                      <p className="text-slate-400 mt-1">
                        Community Lobby
                      </p>

                    </div>

                    <span className="bg-slate-900 border border-green-500bg-slate-900 border border-green-500 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>

                  </div>

                  <div className="mt-5 space-y-2">

                    <p>
                      📍 {lobby.destination}
                    </p>

                    <p>
                      👥 {lobby.members.length} Members
                    </p>

                    <p className="truncate">
                      👤 {lobby.createdBy}
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">

                    {!isMember ? (

                      <button
                        onClick={() =>
                          joinLobby(
                            lobby._id
                          )
                        }
                        className="
                          bg-slate-900 border border-green-500bg-slate-900 border border-green-500
                          hover:bg-green-500
                          px-4
                          py-2
                          rounded-xl
                          transition-all
                        "
                      >
                        Join Lobby
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          leaveLobby(
                            lobby._id
                          )
                        }
                        className="
                          bg-gradient-to-r from-red-500 to-red-700
                          hover:bg-red-500
                          px-4
                          py-2
                          rounded-xl
                        "
                      >
                        Leave Lobby
                      </button>

                    )}

                    <button
                      onClick={() => {

                        localStorage.setItem(
                          "selectedLobby",
                          lobby._id
                        );

                        navigate(
                          "/chat"
                        );

                      }}
                      className="
                        bg-blue-600
                        hover:bg-blue-500
                        px-4
                        py-2
                        rounded-xl
                      "
                    >
                      Open Chat
                    </button>

                    <button
                      onClick={() =>
                        reportLobby(
                          lobby._id
                        )
                      }
                      className="
                        bg-yellow-600
                        hover:bg-yellow-500
                        px-4
                        py-2
                        rounded-xl
                      "
                    >
                      Report
                    </button>

                  </div>

                </motion.div>

              );

            }
          )}

        </div>

      </div>

    </div>

  );

}

export default BrowseLobbies;
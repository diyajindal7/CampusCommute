import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function MyLobbies() {

  const [lobbies, setLobbies] = useState([]);

  useEffect(() => {

    fetchMyLobbies();

  }, []);

  const fetchMyLobbies = async () => {

    try {

      const email =
        localStorage.getItem(
          "userEmail"
        );

      const response =
        await axios.get(
          `http://localhost:5000/api/lobbies/my/${email}`
        );

      setLobbies(response.data);

    } catch (error) {

      console.log(error);

    }

  };



  const deleteLobby = async (
  lobbyId
) => {

  try {

    await axios.delete(
      `http://localhost:5000/api/lobbies/${lobbyId}`
    );

    alert("Lobby deleted");

    fetchMyLobbies();

  } catch (error) {

    console.log(error);

  }

};





  return (

    <div className="flex min-h-screen bg-[#071326] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          My Lobbies
        </h1>

        <div className="space-y-4">

          {lobbies.map((lobby) => (

            <div
              key={lobby._id}
              className="bg-slate-900 p-5 rounded-xl"
            >

              <h2 className="text-xl font-bold">
                {lobby.title}
              </h2>

              <p>
                Destination:
                {" "}
                {lobby.destination}
              </p>

              <p>
                Members:
                {" "}
              {lobby.members?.length || 0}
              </p>


              <div className="mt-3">

  <h3 className="font-bold">
    Members
  </h3>

  {lobby.members?.map(
    (member, index) => (

      <p key={index}>
        {member}
      </p>

    )
  )}

</div>


              <button
      onClick={() =>
        deleteLobby(lobby._id)
      }
      className="bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 rounded mt-3"
    >
      Delete Lobby
    </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default MyLobbies;
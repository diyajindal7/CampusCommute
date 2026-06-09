import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function Notifications() {

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications =
    async () => {

      try {

        const email =
          localStorage.getItem(
            "userEmail"
          );

        const response =
          await axios.get(
            `http://localhost:5000/api/notifications/${email}`
          );

        setNotifications(
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

        <h1 className="text-4xl font-bold mb-6">
          Notifications 🔔
        </h1>

        {notifications.length === 0 && (

          <div
            className="
              bg-slate-900/60
              border
              border-slate-700
              rounded-2xl
              p-10
              text-center
            "
          >
            <h2 className="text-2xl font-bold">
              No Notifications 🔕
            </h2>

            <p className="text-slate-400 mt-2">
              You're all caught up.
            </p>
          </div>

        )}

        {notifications.map((item) => (

          <div
            key={item._id}
            className="
              bg-slate-900/60
              backdrop-blur-md
              border
              border-slate-700
              rounded-2xl
              p-5
              mb-4
              hover:border-green-500
              transition-all
            "
          >
            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-slate-900 border border-green-500bg-slate-900 border border-green-500
                  flex
                  items-center
                  justify-center
                "
              >
                🔔
              </div>

              <div>

                <p className="font-medium">
                  {item.message}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Notifications;
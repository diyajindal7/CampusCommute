import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";


import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FaHome,
  FaBell,
  FaSearch,
  FaCar,
  FaUsers,
  FaUser,
  FaClipboardList,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const roles = JSON.parse(
    localStorage.getItem("userRoles") || "[]"
  );

  const userEmail =
    localStorage.getItem("userEmail");

  const activeClass = (path) =>
    location.pathname === path
      ? "bg-slate-900 border border-green-500bg-slate-900 border border-green-500 text-white shadow-lg"
      : "hover:bg-slate-800 text-slate-300";




      const [
  notificationCount,
  setNotificationCount,
] = useState(0);


  const handleLogout = () => {

    localStorage.clear();
    navigate("/login");

  };

 useEffect(() => {

  fetchNotifications();

  const interval =
    setInterval(() => {

      fetchNotifications();

    }, 10000);

  return () =>
    clearInterval(interval);

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
          `http://13.60.99.228:5000/api/notifications/${email}`
        );

      setNotificationCount(
        response.data.length
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      className="
        w-72
        min-h-screen
        bg-slate-950/95
        backdrop-blur-md
        border-r
        border-slate-800
        flex
        flex-col
        justify-between
      "
    >

      {/* TOP */}

      <div>

        <div className="p-6 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center font-bold text-lg">

              CC

            </div>

            <div>

              <h1 className="text-xl font-bold text-white">
                CampusCommute
              </h1>

              <p className="text-xs text-slate-400">
                NIE verified rides
              </p>

            </div>

          </div>

        </div>

        <nav className="flex flex-col gap-2 p-4">

          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/dashboard")}`}
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/browse"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/browse")}`}
          >
            <FaSearch />
            Browse Rides
          </Link>

          <Link
            to="/create-ride"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/create-ride")}`}
          >
            <FaCar />
            Create Ride
          </Link>

          <Link
            to="/my-rides"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/my-rides")}`}
          >
            <FaClipboardList />
            My Rides
          </Link>

          <hr className="border-slate-800 my-2" />

          <Link
            to="/browse-lobbies"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/browse-lobbies")}`}
          >
            <FaUsers />
            Browse Lobbies
          </Link>

          <Link
            to="/create-lobby"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/create-lobby")}`}
          >
            <FaUsers />
            Create Lobby
          </Link>

          <Link
            to="/my-lobbies"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/my-lobbies")}`}
          >
            <FaUsers />
            My Lobbies
          </Link>

          <Link
            to="/chat"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/chat")}`}
          >
            <FaComments />
            Chat
          </Link>

          <hr className="border-slate-800 my-2" />

          <Link
            to="/requests"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/requests")}`}
          >
            <FaClipboardList />
            Ride Requests
          </Link>

          <Link
            to="/my-requests"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/my-requests")}`}
          >
            <FaClipboardList />
            My Requests
          </Link>

          <Link
            to="/profile"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeClass("/profile")}`}
          >
            <FaUser />
            Profile
          </Link>
          



<Link
  to="/notifications"
  className="
    flex
    items-center
    justify-between
    p-3
    rounded-xl
    hover:bg-slate-800
  "
>
  <div className="flex items-center gap-3">
    <FaBell />
    Notifications
  </div>

  {notificationCount > 0 && (
    <span
      className="
        bg-gradient-to-r from-red-500 to-red-700
        text-xs
        px-2
        py-1
        rounded-full
      "
    >
      {notificationCount}
    </span>
  )}
</Link>

          {roles.includes("admin") && (
            <Link
              to="/admin"
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                bg-cyan-900/40
                text-cyan-300
              "
            >
              🛡 Admin Dashboard
            </Link>
          )}

          {roles.includes("admin") && (
            <Link
              to="/admin-reports"
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                bg-yellow-900/40
                text-yellow-300
              "
            >
              🚩 Reports
            </Link>





          )}

        </nav>

      </div>

      {/* PROFILE CARD */}

      <div className="p-4 border-t border-slate-800">

        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">

          <div className="flex items-center gap-3">

            <div className="relative">

              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-500
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                {userEmail?.[0]?.toUpperCase()}
              </div>

              <div
                className="
                  absolute
                  bottom-0
                  right-0
                  w-3
                  h-3
                  bg-green-500
                  rounded-full
                  border-2
                  border-slate-900
                "
              />
            </div>

            <div>

              <p className="font-semibold">
                Student
              </p>

              <p className="text-xs text-slate-400 truncate w-36">
                {userEmail}
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
           className="
  mt-4
  w-full
  bg-gradient-to-r
  from-red-400
  to-red-500
   hover:scale-105
  hover:from-red-600
  hover:to-red-500
  py-3
  rounded-xl
  flex
  items-center
  justify-center
  gap-2
  transition-all
  shadow-lg
"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default Sidebar;
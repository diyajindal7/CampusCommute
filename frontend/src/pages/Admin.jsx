import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  PieChart,
  Pie,
  Legend,
} from "recharts";

function Admin() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRides: 0,
    totalRequests: 0,
    totalAdmins: 0,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchStats();
    fetchUsers();

  }, []);


  const chartData = [
  {
    name: "Users",
    value: stats.totalUsers,
  },
  {
    name: "Rides",
    value: stats.totalRides,
  },
  {
    name: "Requests",
    value: stats.totalRequests,
  },
  {
    name: "Admins",
    value: stats.totalAdmins,
  },
];


  const fetchStats = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/admin/stats",
         {
    headers: {
      "user-email":
        localStorage.getItem("userEmail"),
    },
  }
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchUsers = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
         {
    headers: {
      "user-email":
        localStorage.getItem("userEmail"),
    },
  }
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const makeAdmin = async (id) => {

    try {

     await axios.put(
  `http://localhost:5000/api/admin/make-admin/${id}`,
  {},
  {
    headers: {
      "user-email":
        localStorage.getItem("userEmail"),
    },
  }
);

     toast.success(
  "User promoted to admin 👑"
);

      fetchUsers();
      fetchStats();

    } catch (error) {

      console.log(error);

    }

  };



const assignRole = async (
  id,
  role
) => {

  try {

   await axios.put(
  `http://localhost:5000/api/admin/assign-role/${id}`,
  { role },
  {
    headers: {
      "user-email":
        localStorage.getItem("userEmail"),
    },
  }
);

    toast.success(
  `${role} assigned`
);
    fetchUsers();

  } catch (error) {

    console.log(error);

  }

};


  const deleteUser = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/admin/user/${id}`,
         {
    headers: {
      "user-email":
        localStorage.getItem("userEmail"),
    },
  }
      );

  toast.success(
  "User deleted"
);

      fetchUsers();
      fetchStats();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="flex min-h-screen bg-[#071326] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard 👑
        </h1>

        <div className="grid grid-cols-4 gap-4 mb-10">

          <div className="bg-slate-900 p-6 rounded-xl">
            <p>Total Users</p>
            <h2 className="text-3xl font-bold">
              {stats.totalUsers}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <p>Total Rides</p>
            <h2 className="text-3xl font-bold">
              {stats.totalRides}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <p>Total Requests</p>
            <h2 className="text-3xl font-bold">
              {stats.totalRequests}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <p>Admins</p>
            <h2 className="text-3xl font-bold">
              {stats.totalAdmins}
            </h2>
          </div>

        </div>


<div className="bg-slate-900 p-6 rounded-xl mb-8">

  <h2 className="text-2xl font-bold mb-4">
    Platform Analytics 📊
  </h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >
    <BarChart data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" 
       fill="#14b8a6"
        />
    </BarChart>
  </ResponsiveContainer>

</div>


 <div className="bg-slate-900 p-6 rounded-xl">

    <h2 className="text-2xl font-bold mb-4">
      Distribution 🥧
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>

        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#14b8a6"
          label
        />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>



        <h2 className="text-2xl font-bold mb-4">
          Manage Users
        </h2>

        <div className="space-y-4">
{users.map((user) => (

  <div
    key={user._id}
    className="bg-slate-900 p-4 rounded-xl flex justify-between items-center"
  >

    <div className="flex items-center gap-3">

      <div
        className="
          w-10 h-10
          rounded-full
          bg-slate-900 border border-green-500bg-slate-900 border border-green-500
          flex
          items-center
          justify-center
          font-bold
        "
      >
        {user.name?.[0]?.toUpperCase()}
      </div>

      <div>

        <p className="font-bold">
          {user.name}
        </p>

        <p>
          {user.email}
        </p>

        <div className="flex gap-2 mt-2">

          {user.roles?.includes("admin") && (
            <span className="bg-yellow-600 px-2 rounded">
              👑 Admin
            </span>
          )}

          {user.roles?.includes("rider") && (
            <span className="bg-blue-600 px-2 rounded">
              🚗 Rider
            </span>
          )}

          {user.roles?.includes("lobby") && (
            <span className="bg-slate-900 border border-green-500bg-slate-900 border border-green-500 px-2 rounded">
              💬 Lobby
            </span>
          )}

        </div>

      </div>

    </div>

    <div className="flex gap-2 flex-wrap">

      {!user.roles?.includes("rider") && (
        <button
          onClick={() =>
            assignRole(user._id, "rider")
          }
          className="bg-blue-600 px-3 py-2 rounded"
        >
          Rider
        </button>
      )}

      {!user.roles?.includes("lobby") && (
        <button
          onClick={() =>
            assignRole(user._id, "lobby")
          }
          className="bg-slate-900 border border-green-500bg-slate-900 border border-green-500 px-3 py-2 rounded"
        >
          Lobby
        </button>
      )}

      {!user.roles?.includes("talkative") && (
        <button
          onClick={() =>
            assignRole(user._id, "talkative")
          }
          className="bg-purple-600 px-3 py-2 rounded"
        >
          Talkative
        </button>
      )}

      {!user.roles?.includes("admin") && (
        <button
          onClick={() =>
            assignRole(user._id, "admin")
          }
          className="bg-yellow-600 px-3 py-2 rounded"
        >
          Admin
        </button>
      )}

      <button
        onClick={() =>
          deleteUser(user._id)
        }
        className="bg-gradient-to-r from-red-500 to-red-700 px-3 py-2 rounded"
      >
        Delete
      </button>

    </div>

  </div>

))}

        </div>

      </div>

    </div>

  );

}

export default Admin;
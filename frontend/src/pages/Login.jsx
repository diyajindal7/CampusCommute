import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

    if (!email || !password) {
    alert("Please fill all fields");
    return;
  }
//   if (!email.endsWith("@nie.ac.in")) {
//   alert("Use your NIE email");
//   return;
// }

  try {

  const response = await axios.post(
    "http://13.60.99.228:5000/api/auth/login",
    {
      email,
      password,
    }
  );

  console.log("FULL RESPONSE:", response.data);

  console.log(response.data);

 if (response.data.success) {
  console.log(
  "ROLES:",
  response.data.user.roles
);

localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "userEmail",
  response.data.user.email
);

localStorage.setItem(
  "userRoles",
  JSON.stringify(
    response.data.user.roles
  )
);

localStorage.setItem(
  "userName",
  response.data.user.name
);
  alert("Login Successful ✅");

  navigate("/dashboard");

}

} catch (error) {

  alert(
    error.response?.data?.message ||
    "Login Failed"
  );

}

 };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071326] text-white">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-slate-400 mb-6">
          Sign in to CampusCommute
        </p>

<form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">
              College Email
            </label>

            <input
              type="email"
              placeholder="yourname@nie.ac.in"
               value={email}
  onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />
          </div>

<p className="text-right">
  <a
    href="/forgot-password"
    className="text-green-400"
  >
    Forgot Password?
  </a>
</p>


          <div>
            <label className="block mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
  onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 border border-green-500bg-slate-900 border border-green-500 hover:bg-green-500 py-3 rounded-lg font-medium"
          >
            Sign In
          </button>

          <p className="text-center mt-4">

  Don't have an account?

  <a
    href="/register"
    className="text-green-400 ml-2"
  >
    Register
  </a>

</p>

      


        </form>
      </div>
    </div>
  );
}

export default Login;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const navigate = useNavigate();
  const handleRegister = async () => {

      console.log("REGISTER BUTTON CLICKED");

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  // if (!email.endsWith("@nie.ac.in")) {
  //   alert("Please use your NIE email");
  //   return;
  // }
try {

  const response = await axios.post(
    "http://localhost:5000/api/auth/register",
    {
      name,
      email,
      password,
    }
  );

  if (response.data.success) {

    alert(response.data.message);

    navigate("/verify-otp");

  }

} catch (error) {

  alert(
    error.response?.data?.message ||
    "Registration Failed"
  );

}

};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071326] text-white">

      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        />

        <input
          type="email"
          placeholder="NIE Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        />

        <button
  onClick={handleRegister}
  className="w-full bg-slate-900 border border-green-500bg-slate-900 border border-green-500 py-3 rounded"
>
  Register
</button>

      </div>

    </div>
  );
}

export default Register;
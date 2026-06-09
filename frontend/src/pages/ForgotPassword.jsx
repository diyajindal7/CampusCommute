import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const sendOTP = async () => {

    try {

      const response = await axios.post(
        "http://13.60.99.228:5000/api/auth/forgot-password",
        { email }
      );

      alert(response.data.message);

      navigate("/reset-password");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071326] text-white">

      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        />

        <button
          onClick={sendOTP}
          className="w-full bg-slate-900 border border-green-500bg-slate-900 border border-green-500 py-3 rounded"
        >
          Send OTP
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;
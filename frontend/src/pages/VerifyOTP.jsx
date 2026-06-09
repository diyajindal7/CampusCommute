import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleVerify = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Verification Failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071326] text-white">

      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Verify OTP
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-800 rounded"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-slate-900 border border-green-500bg-slate-900 border border-green-500 py-3 rounded"
        >
          Verify
        </button>

      </div>

    </div>
  );
}

export default VerifyOTP;
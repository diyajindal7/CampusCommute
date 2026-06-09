import { Link } from "react-router-dom";
import preview from
"../assets/dashboard-preview.png";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071326] via-[#0a1830] to-[#10213f] text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-green-400">
          🚗 CampusCommute
        </h1>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="bg-slate-800 px-5 py-2 rounded-xl"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-slate-900 border border-green-500bg-slate-900 border border-green-500 px-5 py-2 rounded-xl"
          >
            Register
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="text-center py-24 px-6">

        <h1 className="text-6xl font-bold mb-6">
          Safe Campus Ride Sharing 🚗 
        </h1>

        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Connect with verified NIE students, share rides,
          reduce travel costs, and commute safely together.
        </p>

        <div className="flex justify-center gap-4 mt-10">

          <Link
            to="/register"
            className="bg-slate-900 border border-green-500bg-slate-900 border border-green-500 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-slate-600 px-8 py-4 rounded-2xl"
          >
            Login
          </Link>

        </div>

      </section>

      <section className="px-10 pb-20">

  <h2 className="text-6xl font-bold text-center mb-10">
    Platform Preview 🚀
  </h2>
  <section className="py-20">
  <h2 className="text-6xl font-bold text-center mb-10">
    Why Students Love CampusCommute ❤️
  </h2>

  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

    <div className="bg-slate-900/60 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold">
        🚗 Save Money
      </h3>
      <p className="text-slate-400 mt-3">
        Share travel costs with classmates.
      </p>
    </div>

    <div className="bg-slate-900/60 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold">
        🔒 Safe Travel
      </h3>
      <p className="text-slate-400 mt-3">
        Only verified NIE students can join.
      </p>
    </div>

    <div className="bg-slate-900/60 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold">
        💬 Real Time Chat
      </h3>
      <p className="text-slate-400 mt-3">
        Coordinate rides instantly.
      </p>
    </div>

  </div>
</section>

  <div className="max-w-6xl mx-auto">

   <img
  src="https://picsum.photos/1200/700"
  alt="Dashboard Preview"

      className="
        rounded-2xl
        shadow-2xl
        border
        border-slate-700
      "
    />

  </div>

</section>

<section className="py-20">
  <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">

    <div className="text-center">
      <h2 className="text-4xl font-bold text-green-400">
        500+
      </h2>
      <p>Students</p>
    </div>

    <div className="text-center">
      <h2 className="text-4xl font-bold text-green-400">
        120+
      </h2>
      <p>Rides Shared</p>
    </div>

    <div className="text-center">
      <h2 className="text-4xl font-bold text-green-400">
        40+
      </h2>
      <p>Ride Pools</p>
    </div>

    <div className="text-center">
      <h2 className="text-4xl font-bold text-green-400">
        100%
      </h2>
      <p>Verified Users</p>
    </div>

  </div>
</section>

      {/* Features */}

      <section className="px-10 pb-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          Features ✨
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900/60 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-3">
              🚗 Ride Sharing
            </h3>

            <p className="text-slate-400">
              Create rides and travel with verified students.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-3">
              💬 Real-Time Chat
            </h3>

            <p className="text-slate-400">
              Communicate instantly through lobby chat.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-3">
              🛡 Secure Access
            </h3>

            <p className="text-slate-400">
              OTP verification and role-based access control.
            </p>
          </div>

        </div>

      </section>

      {/* How it works */}
      

      <section className="px-10 pb-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">

          <div>
            <h3 className="text-5xl mb-3">1️⃣</h3>
            <p>Register using college email</p>
          </div>

          <div>
            <h3 className="text-5xl mb-3">2️⃣</h3>
            <p>Create or browse rides</p>
          </div>

          <div>
            <h3 className="text-5xl mb-3">3️⃣</h3>
            <p>Send ride requests</p>
          </div>

          <div>
            <h3 className="text-5xl mb-3">4️⃣</h3>
            <p>Travel together safely</p>
          </div>

        </div>

      </section>






<section className="py-20 text-center">

  <h2 className="text-4xl font-bold">
    Ready to Commute Smarter? 🚗
  </h2>

  <p className="text-slate-400 mt-4">
    Join CampusCommute and travel safely with verified students.
  </p>

  <Link
    to="/register"
    className="
      inline-block
      mt-8
      bg-slate-900 border border-green-500bg-slate-900 border border-green-500
      px-8
      py-4
      rounded-2xl
      font-bold
      hover:scale-105
      transition-all
    "
  >
    Get Started Now
  </Link>

</section>
     {/* Footer */}


<footer className="border-t border-slate-800 mt-20 py-8 text-center">
<h3 className="text-xl font-bold text-green-400">
CampusCommute
</h3>

<p className="text-slate-400 mt-2">
Secure Ride Sharing for NIE Students
</p>

<p className="text-slate-500 text-sm mt-2">
Built with MERN • Socket.IO • AWS EC2
</p>
</footer>

    </div>
  );
}


export default LandingPage;
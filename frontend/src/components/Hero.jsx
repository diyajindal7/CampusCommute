function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        <div>
          <span className="bg-slate-800 text-green-400 px-4 py-2 rounded-full text-sm">
            Verified @nie.ac.in access
          </span>

          <h1 className="text-5xl font-bold mt-6 leading-tight">
            CampusCommute
          </h1>

          <p className="text-slate-300 mt-6 text-lg">
            Coordinate personal rides, auto pools, and Uber
            lobbies with verified college students.
          </p>

          <button className="mt-8 bg-slate-900 border border-green-500bg-slate-900 border border-green-500 px-6 py-3 rounded-lg font-medium hover:bg-green-500">
            Get Started
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h2 className="font-bold mb-4">
            Evening Commute Board
          </h2>

          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-xl">
              🛺 Auto Lobby
              NIE North → NIE South
              3/4 Seats
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              🛵 Scooty Ride
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              🚕 Uber Pool
            </div>
          </div>

<div className="flex gap-8 mt-10">
  <div>
    <h3 className="text-2xl font-bold">500+</h3>
    <p className="text-slate-400">Students</p>
  </div>

  <div>
    <h3 className="text-2xl font-bold">120+</h3>
    <p className="text-slate-400">Rides</p>
  </div>

  <div>
    <h3 className="text-2xl font-bold">40+</h3>
    <p className="text-slate-400">Pools</p>
  </div>
</div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
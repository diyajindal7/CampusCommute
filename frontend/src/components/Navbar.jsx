import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-5 border-b border-slate-700">
      <div className="flex items-center gap-3">
        <div className="bg-slate-900 border border-green-500bg-slate-900 border border-green-500 w-10 h-10 rounded-lg flex items-center justify-center font-bold">
          CC
        </div>

        <div>
          <h1 className="font-bold text-base">
            CampusCommute
          </h1>

          <p className="text-xs text-slate-400">
            NIE verified rides
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
  {userEmail && (
    <span className="text-sm text-slate-300">
      {userEmail}
    </span>
  )}

  {!userEmail && (
    <Link
      to="/login"
      className="bg-slate-900 border border-green-500bg-slate-900 border border-green-500 hover:bg-green-500 px-4 py-2 rounded-lg"
    >
      Sign In
    </Link>
  )}
</div>
    </nav>
  );
}

export default Navbar;
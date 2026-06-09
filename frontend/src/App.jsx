import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import CreateRide from "./pages/CreateRide";
import CreateLobby from "./pages/CreateLobby";
import Requests from "./pages/Requests";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import MyRides from "./pages/MyRides";
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import AdminRoute from "./components/AdminRoute";
import BrowseLobbies
from "./pages/BrowseLobbies";
import Chat from "./pages/Chat";

import MyLobbies
from "./pages/MyLobbies";

import AdminReports
from "./pages/AdminReports";
import Notifications
from "./pages/Notifications";

import MyRequests from "./pages/MyRequests";

import LandingPage from "./pages/LandingPage";



function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#071326] text-white">

       {window.location.pathname !== "/" &&
 window.location.pathname !== "/login" &&
 window.location.pathname !== "/register" ? (
  <Navbar />
) : null}

        <Routes>
          <Route path="/" element={<LandingPage />} />
         

          <Route path="/login" element={<Login />} />
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>          <Route path="/browse" element={<ProtectedRoute> <Browse /></ProtectedRoute>} />
          <Route path="/create-ride" element={<ProtectedRoute> <CreateRide /></ProtectedRoute>} />
<Route
  path="/create-lobby"
  element={
    <ProtectedRoute>
      <CreateLobby />
    </ProtectedRoute>
  }
/>          <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          
          <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
          <Route
  path="/verify-otp"
  element={<VerifyOTP />}
/>
          <Route
  path="/my-rides"
  element={<ProtectedRoute><MyRides /></ProtectedRoute>}
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>

<Route
  path="/browse-lobbies"
  element={
    <ProtectedRoute>
      <BrowseLobbies />
    </ProtectedRoute>
  }
/>


<Route
  path="/my-lobbies"
  element={
    <ProtectedRoute>
      <MyLobbies />
    </ProtectedRoute>
  }
/>

<Route
  path="/chat"
  element={
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin-reports"
  element={
    <AdminRoute>
      <AdminReports />
    </AdminRoute>
  }
/>


<Route
  path="/my-requests"
  element={
    <ProtectedRoute>
      <MyRequests />
    </ProtectedRoute>
  }
/>


<Route
  path="/notifications"
  element={
    <Notifications />
  }
/>


        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
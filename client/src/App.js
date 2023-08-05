import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyTerrain from "./pages/admin/ApplyTerrain";
import Users from "./pages/admin/Users";
import Terrains from "./pages/admin/Terrains";
import NotificationPage from "./pages/NotificationPage";
import BookingPage from "./pages/BookingPage";
import AdminAppointments from "./pages/admin/AdminAppointments";
import Appointments from "./pages/Appointments";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
              <Route
              
              path="/terrain/book-appointment/:Id"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
<Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
/>
<Route
              path="/admin/terrains"
              element={
                <ProtectedRoute>
                  <Terrains />
                </ProtectedRoute>
              }
            />
              <Route
              path="/admin/apply-terrain"
              element={
                <ProtectedRoute>
                  <ApplyTerrain />
                </ProtectedRoute>
              }
            />
                <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
        <Route
              path="/admin-appointments"
              element={
                <ProtectedRoute>
                  <AdminAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
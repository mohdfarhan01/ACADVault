import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import FacultyDashboard from './pages/dashboards/FacultyDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import OrganizerDashboard from './pages/dashboards/OrganizerDashboard';
import RecruiterDashboard from './pages/dashboards/RecruiterDashboard';
import ActivityForm from './pages/student/ActivityForm';
import MyActivities from './pages/student/MyActivities';
import MyPortfolio from './pages/student/MyPortfolio';
import VerifyActivities from './pages/faculty/VerifyActivities';
import EventManagement from './pages/organizer/EventManagement';
import CreateEvent from './pages/organizer/CreateEvent';
import Reports from './pages/admin/Reports';
import StudentSearch from './pages/recruiter/StudentSearch';
import PublicPortfolio from './pages/PublicPortfolio';
import QRScanner from './pages/QRScanner';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portfolio/:studentId" element={<PublicPortfolio />} />
            <Route path="/verify/:activityId" element={<QRScanner />} />

            {/* Student Routes */}
            <Route path="/student/dashboard" element={
              <PrivateRoute role="student">
                <StudentDashboard />
              </PrivateRoute>
            } />
            <Route path="/student/activities/new" element={
              <PrivateRoute role="student">
                <ActivityForm />
              </PrivateRoute>
            } />
            <Route path="/student/activities" element={
              <PrivateRoute role="student">
                <MyActivities />
              </PrivateRoute>
            } />
            <Route path="/student/portfolio" element={
              <PrivateRoute role="student">
                <MyPortfolio />
              </PrivateRoute>
            } />

            {/* Faculty Routes */}
            <Route path="/faculty/dashboard" element={
              <PrivateRoute role="faculty">
                <FacultyDashboard />
              </PrivateRoute>
            } />
            <Route path="/faculty/verify" element={
              <PrivateRoute role="faculty">
                <VerifyActivities />
              </PrivateRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/reports" element={
              <PrivateRoute role="admin">
                <Reports />
              </PrivateRoute>
            } />

            {/* Organizer Routes */}
            <Route path="/organizer/dashboard" element={
              <PrivateRoute role="organizer">
                <OrganizerDashboard />
              </PrivateRoute>
            } />
            <Route path="/organizer/events" element={
              <PrivateRoute role="organizer">
                <EventManagement />
              </PrivateRoute>
            } />
            <Route path="/organizer/events/new" element={
              <PrivateRoute role="organizer">
                <CreateEvent />
              </PrivateRoute>
            } />

            {/* Recruiter Routes */}
            <Route path="/recruiter/dashboard" element={
              <PrivateRoute role="recruiter">
                <RecruiterDashboard />
              </PrivateRoute>
            } />
            <Route path="/recruiter/search" element={
              <PrivateRoute role="recruiter">
                <StudentSearch />
              </PrivateRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

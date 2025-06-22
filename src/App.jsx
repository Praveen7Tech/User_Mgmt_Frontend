import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const DashBoard = lazy(() => import('./pages/DashBoard'));
const CreateUser = lazy(() => import('./pages/CrateUser'));
const ShowProfileUser = lazy(() => import('./pages/ShowProfileUser'));

import ProtectedRoute from './context/ProtectedRoute';
import PublicRoute from './context/PublicRoute';
import ProtectedAdmin from './context/ProtectedAdmin';
import PublicAdmin from './context/PublicAdmin';
import NotFound from './components/NotFound';


function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen text-xl font-medium text-indigo-600">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminLogin"
            element={
              <PublicAdmin>
                <AdminLogin />
              </PublicAdmin>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedAdmin>
                <DashBoard />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/ShowUser/:userId"
            element={
              <ProtectedAdmin>
                <ShowProfileUser/>
              </ProtectedAdmin>
            }
          />
          <Route
            path="/addUser"
            element={
              <ProtectedAdmin>
                <CreateUser />
              </ProtectedAdmin>
            }
          />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;

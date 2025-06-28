import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import FloatingShape from './components/FloatingShape';
import SignupPage from './pages/signupPage';
import LogInPage from './pages/logInPage';
import VerifyEmail from './pages/VerifyEmail';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import LoadingSpinner from './components/LoadingSpiner';
import ForgotPasswordpage from './pages/ForgotPasswordpage';
// protect the routes and redirect authenticated users

export const ProtectRoute = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isverified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
}


// redirect to the signup page if the user is not authenticated

const RedirectAuthenticatedUser = ({children}) => {
   const { isAuthenticated, user, ischeckingAuth } = useAuthStore();

  if (ischeckingAuth) {
    return <div className="text-white text-lg">Checking authentication...</div>;
  }

  if (isAuthenticated && user?.isverified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// and to the home page if the user is authenticated




function App() {
  const {ischeckingAuth,checkAuthfront,isAuthenticated,user} = useAuthStore();

  useEffect(()=>{
    useAuthStore.getState().checkAuthfront(); 
  },[]);
  
  if (ischeckingAuth) {
    return <LoadingSpinner/>;
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-700 to-orange-900 flex items-center justify-center relative overflow-hidden">
        <FloatingShape 
          color="bg-orange-300" 
          size="w-92 h-62" 
          top="top-60" 
          left="right-30" 
          delay={5} 
        /> 

        <FloatingShape 
          color="bg-orange-300"
          size="w-96 h-56" 
          top="bottom-20" 
          left="left-10" 
          delay={2} 
        />

        <Router>
          <Routes>
            <Route path="/" element={
              <ProtectRoute>
                <Dashboard/>
              </ProtectRoute>
              } />
            <Route path="/signup" element={
              <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>} />
            <Route path="/login" element={
              
               <RedirectAuthenticatedUser>
              <LogInPage />
            </RedirectAuthenticatedUser>
              
              } />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path='/forgot-password' element={<RedirectAuthenticatedUser>
              <ForgotPasswordpage />
            </RedirectAuthenticatedUser>} />
          </Routes>

        </Router>
        <Toaster />
      </div>
    </>
  );
}

export default App;

import { Route, Routes, useMatch } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Property from './pages/Property/Property';
import Sidebar from './components/sidebar/Sidebar';
import Splash from './pages/splash/Splash';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import OTPVerification from './pages/auth/OTPVerification';
import NewPassword from './pages/auth/NewPassword';
import Success from './pages/auth/Success';
import Users from './pages/users/Users';
import Settings from './pages/settings/Settings';
import NotFound from './pages/notFound/NotFound';
import AdminManagement from './pages/adminManagement/AdminManagement';
import UserDetails from './pages/users/UserDetails';
import { ProtectedRoute, PublicRoute } from './middleware/routeProtections';
import PropertyDetails from './pages/Property/PropertyDetails';
import AdminDetails from './pages/adminManagement/AdminDetails';
import Notifications from './pages/notifications/Notifications';
import NotificationDetails from './pages/notifications/NotificationDetails';
import PropertyCategory from './pages/propertyCategory/PropertyCategory';

function App() {

  // Use useMatch to check if the current route matches any of the defined routes
  const isDashboardMatch = useMatch('/dashboard');
  const isDashboardDetailsMatch = useMatch('/dashboard/details');
  const isProductMatch = useMatch('/property');
  const isProductIdMatch = useMatch('/property/details/:id');
  const isUsersMatch = useMatch('/users');
  const isUsersDetailsMatch = useMatch('/user/details/:id');
  const isSettingsMatch = useMatch('/settings');
  const isAdminManagementMatch = useMatch('/adminmanagement');
  const isAdminDetailsMatch = useMatch('/admin/details/:id');
  const isNotificationsMatch = useMatch('/notifications');
  const isNotificationDetailsMatch = useMatch('/notification/details/:id');
  const isPropertyCategoryMatch = useMatch('/propertycategory');

  // Sidebar should be visible only for these exact matches
  const isSidebarVisible = isDashboardMatch || isDashboardDetailsMatch || isProductMatch || isProductIdMatch || isUsersMatch || isUsersDetailsMatch || isSettingsMatch || isNotificationsMatch || isNotificationDetailsMatch || isAdminManagementMatch || isAdminDetailsMatch || isPropertyCategoryMatch;

  // --------- Admin Data in Local Storage ---------
  const adminData = JSON.parse(localStorage.getItem('admin'))
  const isAuthenticated  = !!adminData
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100'>
      <div className='fixed inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>

      {/* Conditionally render Sidebar */}

      {isSidebarVisible && <Sidebar />}
      <div className='flex-1 overflow-y-auto'>
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/auth/login' element={<PublicRoute isAuthenticated={isAuthenticated} element={<Login/>}/>} />
          <Route path='/auth/forgotpassword' element={<PublicRoute isAuthenticated={isAuthenticated} element={<ForgotPassword/>} />} />
          <Route path='/auth/otpverification' element={<PublicRoute isAuthenticated={isAuthenticated} element={<OTPVerification/>}/>} />
          <Route path='/auth/newpassword' element={<PublicRoute isAuthenticated={isAuthenticated} element={<NewPassword/>}/>} />
          <Route path='/auth/success' element={<PublicRoute isAuthenticated={isAuthenticated} element={<Success/>}/>} />
          <Route path='/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Dashboard/>} />} />
          <Route path='/property' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Property/>}/>} />
          <Route path='/property/details/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<PropertyDetails/>}/>} />
          <Route path='/adminmanagement' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<AdminManagement/>}/>} />
          <Route path='/admin/details/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<AdminDetails/>}/>} />
          <Route path='/users' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Users />}/>} />
          <Route path='/user/details/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<UserDetails/>}/>}/>
          <Route path='/notifications' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Notifications/>}/>}/>
          <Route path='/notification/details/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<NotificationDetails/>}/>}/>
          <Route path='/propertycategory' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<PropertyCategory/>}/>}/>
          <Route path='/settings' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Settings/>}/>} />
          {/* Catch-all route for 404 Not Found */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

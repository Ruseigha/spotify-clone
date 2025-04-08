import { axiosInstance } from '@/lib/axios'; // Axios instance for API requests
import { useAuth } from '@clerk/clerk-react'; // Clerk authentication hook
import React, { ReactNode, useEffect } from 'react'; // React imports
import { Loader } from "lucide-react"; // Loader component for loading state
import { useAuthStore } from '@/stores/useAuthStore'; // Zustand store for authentication state

/**
 * AuthProvider Component
 * 
 * This component wraps the application and handles authentication logic.
 * It retrieves the user's token, sets it in the Axios instance for API requests,
 * and checks the admin status of the user.
 * 
 * @param {ReactNode} children - The child components to render inside the provider.
 * @returns {JSX.Element} The provider with authentication logic.
 */
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getToken } = useAuth(); // Clerk hook to get the user's token
  const [loading, setLoading] = React.useState(true); // State to track loading status
  const { checkAdminStatus } = useAuthStore(); // Zustand action to check admin status

  /**
   * Updates the Axios instance with the user's token.
   * If the token is null, it removes the Authorization header.
   * 
   * @param {string | null} token - The user's authentication token.
   */
  const updateApiToken = (token: string | null) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };

  /**
   * Initializes authentication by retrieving the user's token,
   * updating the Axios instance, and checking admin status.
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken(); // Retrieve the user's token
        updateApiToken(token); // Update Axios with the token
        if (token) {
          await checkAdminStatus(); // Check if the user is an admin
        }
      } catch (error) {
        updateApiToken(null); // Remove token if an error occurs
        console.error("Error in auth provider", error); // Log the error
      } finally {
        setLoading(false); // Set loading to false after initialization
      }
    };

    initAuth(); // Call the initialization function
  }, [getToken, checkAdminStatus]); // Dependencies for useEffect

  // Show a loading screen while authentication is being initialized
  if (loading) {
    return (
      <div className='h-screen w-full flex justify-center items-center bg-black'>
        <Loader className='size-8 text-emerald-500 animate-spin' />
      </div>
    );
  }

  // Render the children components once authentication is complete
  return (
    <div>
      {children}
    </div>
  );
};

export default AuthProvider;
import { axiosInstance } from '@/lib/axios';
import { useAuth } from '@clerk/clerk-react';
import React, { ReactNode, useEffect } from 'react';
import { Loader } from "lucide-react";
import { useAuthStore } from '@/stores/useAuthStore';

const AuthProvider = ({children}: { children: ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const {checkAdminStatus} = useAuthStore()

  const updateApiToken = (token: string | null) => {
    if (token){
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token){
          await checkAdminStatus();
        }

      } catch (error) {
        updateApiToken(null); // Remove token if error occurs 
        console.error("Error in auth provider", error);
      } finally {
        setLoading(false); // Set loading to false after token retrieval
      }
    };

    initAuth();
  }, [getToken]);

  if (loading) return (
    <div className='h-screen w-full flex justify-center items-center bg-black'>
      <Loader className='size-8 text-emerald-500 animate-spin'/>
    </div>
    );  
  return (
    <div>
      {children}
    </div>
  )
}
export default AuthProvider

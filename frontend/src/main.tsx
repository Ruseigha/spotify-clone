import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";
import { Toaster } from 'react-hot-toast';

import './index.css'
import App from './App.tsx';
import AuthProvider from './providers/AuthProvider.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <BrowserRouter>
            <App /> 
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
)

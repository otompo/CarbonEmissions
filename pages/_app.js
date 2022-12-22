import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../context/authContext";
import { useEffect, useState } from "react";
import { PartnersProvider } from "../context/partnersContext";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Navbar from "../components/Navbar";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PartnersProvider>
            <Hydrate state={pageProps.dehydratedState}>
              <Toaster />
              <Navbar />
              <Component {...pageProps} />
            </Hydrate>
          </PartnersProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

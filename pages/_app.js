import "@/styles/globals.css";
import { AuthProvider } from "context/AuthContext";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </AuthProvider>
  );
}

export default MyApp;

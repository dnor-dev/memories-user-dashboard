import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@chakra-ui/react";

const Signin = lazy(() => import("../pages/signin"));
const Signup = lazy(() => import("../pages/signup"));
const Dashboard = lazy(() => import("../pages/dashboard"));

const AppRoutes = () => {
  return (
    <AnimatePresence>
      <Suspense
        fallback={<Progress size="xs" colorScheme="blue" isIndeterminate />}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Routes>
            <Route path="/" element={<Navigate replace to="/signin" />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </motion.div>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;

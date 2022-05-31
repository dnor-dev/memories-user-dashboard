import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const Signin = lazy(() => import("../pages/signin"));
const Signup = lazy(() => import("../pages/signup"));
const Dashboard = lazy(() => import("../pages/dashboard"));

const AppRoutes = () => {
  const { user, authLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user._id !== "" && isAuthenticated) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, authLoading, user]);
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
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="search" element={<Dashboard />} />
            </Route>
          </Routes>
        </motion.div>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;

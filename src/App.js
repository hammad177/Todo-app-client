import { useContext, useEffect } from "react";
import Loading from "./components/Loading";
import { reloadSession } from "./context/GlobalAction";
import GlobalContext from "./context/GlobalContext";
import DashboardLayout from "./pages/DashboardLayout";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    reloadSession(dispatch);
  }, [dispatch]);

  if (state.isSignOut === null) {
    return <Loading />;
  }

  if (state.isSignOut) {
    return <PublicRoutes />;
  }

  return <DashboardLayout />;
}

export default App;

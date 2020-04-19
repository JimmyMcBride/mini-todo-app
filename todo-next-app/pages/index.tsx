import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../components/Dashboard";

export default () => {
  return <PrivateRoute component={Dashboard} />;
};

import { useQuery } from "@apollo/react-hooks";

import { GET_USER_QUERY } from "../../queries/me";

import LandingPage from "./LandingPage";
import Loading from "./Loading";

interface PrivateProps {
  component: React.FC;
}

export default function PrivateRoute({
  component: PrivateComponent,
}: PrivateProps) {
  const { data, loading } = useQuery(GET_USER_QUERY);

  const user = data?.me;

  console.log(user);

  return (
    <>
      {user ? (
        <PrivateComponent />
      ) : !loading && !user ? (
        <LandingPage />
      ) : (
        <Loading />
      )}
    </>
  );
}

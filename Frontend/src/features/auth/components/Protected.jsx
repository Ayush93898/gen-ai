// as we want to build protected routes
// but how do we get to know
//  simple jo context me user hai -- agr uski koi value hai...it means loggedIn h
// or agr null hai toh nhi h

import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();
 

  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to={"/login"}/>
  }

  return children;
};

export default Protected;

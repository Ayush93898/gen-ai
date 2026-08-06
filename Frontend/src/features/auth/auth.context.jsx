    // context API
    // 3 steps
    //     1. create the context
    //     2. provide the data
    //     3. use that data

import { createContext, useState } from "react";
export const AuthContext = createContext();  // Capital A (convention)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};


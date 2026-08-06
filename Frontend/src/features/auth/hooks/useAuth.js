import { createContext, useContext } from "react";
import { AuthContext } from "../auth.context";
import { register, getMe, login, logout } from "../services/auth.api";
import { useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      setUser(data.user);
    } catch (error) {
      console.error("Login failed:", error.message);
      // setError(error.message)  ← optional: show error to user
    } finally {
      setLoading(false); // runs NO MATTER WHAT ✅
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register(username, email, password);
      setUser(data.user);
    } catch (error) {
      console.error("Register failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // as after refreshing the page, the data of the user fade away
  // use getMe() as it is token dependent fucntion
  // so after refreshing , state me user nhi rehta but token rehta hai
  // and usme humne user pass kar rakha ... toh we got the information
  useEffect(() => {
    const getAndSetUser = async () => {
      const data = await getMe();
      setUser(data.user);
      setLoading(false);
    };
    getAndSetUser();
  }, []);

  return { user, loading, handleLogin, handleLogout, handleRegister };
};

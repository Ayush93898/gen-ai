import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";

// handeling state and api layer

export const useAuth = () => {

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true); // mtlb jub tak login hora hai, tab tak loading screen dikhao
    try {
      const data = await login({ email, password }); // login ka response --
      /**
     * res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
     */

      const loggedInUser = data?.user ?? null;
      setUser(loggedInUser);

      return loggedInUser;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true); // mtlb jub tak login hora hai, tab tak loading screen dikhao
    try {
      const data = await register({ username, email, password }); // register ka response --

      const registeredUser = data?.user ?? null;
      setUser(registeredUser);

      return registeredUser;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleLogin, handleLogout, handleRegister };
};

import axios from "axios";

// so we write 4 fn -- that interact with 4 api's which we wrote in backend section

// as withCredentials:true , har ek fn me dena pad raha hai: i.e repetetive code
// we can stop it by making an instance
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // tells axios to include cookies (and other credentials like auth headers) in the request.
});

// register
export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// login
export async function login(email, password) {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//logout
export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//whoami
export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me", {});
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

import axios from "axios";

// so we write 4 API's

// as withCredentials:true , har ek fn me dena pad raha hai: i.e repetetive code
// we can stop it by making an instance
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// register
export async function register({ username, email, password }) {
  try {
    const response = await api.post(
      "/api/auth/register",
      {
        username,
        email,
        password,
      },
      //   {
      //     withCredentials: true, // tells axios to include cookies (and other credentials like auth headers) in the request.
      //   },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// login
export async function login(email, password) {
  try {
    const response = await api.post(
      "/api/auth/login",
      { email, password },
      //   { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//logout
export async function logout() {
  try {
    const response = await api.get(
      "/api/auth/login",
      {},
      //   { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//whoami
export async function getMe() {
  try {
    const response = await api.get(
      "/api/auth/get-me",
      {},
      //   { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

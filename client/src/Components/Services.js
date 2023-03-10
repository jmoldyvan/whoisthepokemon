import axios from "axios";
import auth from "../config/firebase";

const baseURL = "http://localhost:5000";

const getUserToken = async () => {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  return token;
};

const createHeader = async () => {
  const token = await getUserToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const postUser = async (userId) => {
  const headers = await createHeader();
  try {
    const res = await axios.post(`${baseURL}/signup`,{userId}, {headers});
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
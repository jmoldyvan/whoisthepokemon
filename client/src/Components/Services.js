import axios from "axios";
import auth from "../config/firebase";

const baseURL = "http://localhost:5000/";

const getUserToken = async () => {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  return token;
};

const createHeader = async () => {
  const token = await getUserToken();

  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

export const postUser = async (userInfo) => {
  const header = await createHeader();

  try {
    const res = await axios.post(`${baseURL}/signup`, header);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
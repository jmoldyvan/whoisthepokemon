import axios from "axios";
import auth from "../../config/firebase";

const baseURL = "https://whos-that-pokemon-mzig.onrender.com";

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
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateScore = async (userId, score) => {

  const headers = await createHeader();
  
  try {
    const res = await axios.put(`${baseURL}/updateScore`,{userId, score}, {headers});
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateHighScore = async (userId, score) => {
  const headers = await createHeader();
  try {
    const res = await axios.put(`${baseURL}/updateHighScore`,{userId, score}, {headers});
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserHighScore = async () => {

  const headers = await createHeader();
  try {
    const res = await axios.get(`${baseURL}/getUserHighScore`, {headers});
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
// export const checkUserName = async (userName) => {
//   try {
//     const res = await axios.get(`${baseURL}/checkUserName`, {userName});
//     console.log(res.data);
//     return res.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getAllHighScore = async () => {

  const headers = await createHeader();
  
  try {
    const res = await axios.get(`${baseURL}/getAllHighScore`, {headers});
    return res.data;
  } catch (error) {
    console.error(error);
  }
};


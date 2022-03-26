import axios from "axios";

//send token and get user from the backend //createuser
export const getDispatch = async (pageNum) => {
  return await axios.post(
    `http://localhost:8000/api/getDispatch`,
    { pageNum },
    {}
  );
};

export const createDispatch = async (payload, token) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      token,
    },
  };
  return await axios.post(
    `http://localhost:8000/api/createdispatch`,
    payload,
    config
  );
};

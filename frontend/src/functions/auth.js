import axios from "axios";

//send token and get user from the backend //createuser
export const loginUser = async (username, password) => {
  return await axios.post(
    `http://localhost:8000/api/login`,
    { username: username, password: password },
    {}
  );
};

export const getToken = async (userId, refreshToken) => {
  return await axios.post(
    `http://localhost:8000/api/generatetoken`,
    { userId, refreshToken },
    {}
  );
};

// //get created or CUrrentuser from the backend
// export const currentUser = async (authToken) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API_URL}/currentUser`,
//     {},
//     {
//       headers: {
//         authToken,
//       },
//     }
//   );
// };

// //get Admin user
// export const currentAdmin = async (authToken) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API_URL}/currentAdmin`,
//     {},
//     {
//       headers: {
//         authToken,
//       },
//     }
//   );
// };

import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register Users
const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  return res.data;
};
// Login Users

const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  return res.data;
};

// Logout User
const logout = async () => {
  const res = await axios.get(API_URL + "logout");
  return res.data.message;
};

// Login Status
const getLoginStatus = async () => {
  const res = await axios.get(API_URL + "loggedin");
  return res.data;
};

// Get User

const getUser = async () => {
  const res = await axios.get(API_URL + "getuser");
  return res.data;
};
// Change Password

const changePassword = async (userData) => {
  const res = await axios.patch(API_URL + "changepassword", userData);
  return res.data.message;
};

// Update User

const updateUser = async (userData) => {
  const res = await axios.patch(API_URL + "updateuser", userData);
  return res.data.message;
};

// get Users

const getUsers = async () => {
  const res = await axios.get(API_URL + "getusers");
  return res.data;
};

const deleteUser = async (id) => {
  const res = await axios.delete(API_URL + id);
  return res.data.message;
};

const authService = {
  register,
  validateEmail,
  login,
  logout,
  getLoginStatus,
  changePassword,
  getUser,
  updateUser,
  getUsers,
  deleteUser,
};

export default authService;

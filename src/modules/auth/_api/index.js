import Api from "@/api";
const route = "auth";
// import Jwt from '../../../api/jwt'

const Register = async body => {
  const result = await Api.post(`/${route}/register`, body);
  return result.data;
};

const updateUser = async body =>{
  const result = await Api.post(`/${route}/update`, body);
  return result.data;
}

const me = async body => {
  const result = await Api.post(`/${route}/me`, body);
  return result.data;
};

const login = async body => {
  const result = await Api.post(`${route}/login`, body);
  return result.data;
};

const passwordReset = async body => {
  const result = await Api.post(`v1/${route}/password-reset`, body);
  return result.data;
};

const logout = async () => {
  const result = await Api.post(`${route}/logout`);
  return result.data;
};


export default {
  Register,
  me,
  login,
  passwordReset,
  logout,
  updateUser
};

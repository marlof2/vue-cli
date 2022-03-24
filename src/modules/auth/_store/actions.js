import api from '../_api'
// import Jwt from '../../../api/jwt'

const me = async ({commit}) => {
  const result = await api.me();
  commit("STORE_ME", result)
}
const login = async (context, object) => {
  const result = await api.login(object);
  return result
  // context.commit("STORE_ME", result)
}
const getUsers = async (context) => {
  const result =  await api.getUsers();
  context.commit("STORE_GET_USER", result)
}

const logout = async ({commit}) => {
  await api.logout()
  commit('STORE_ME_LOGOUT')
}


export default {
  me,
  logout,
  getUsers,
  login,
}

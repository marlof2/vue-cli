import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";


const state = {
  authenticated: [],
  actualAuthorization: [],
  usuarioLDAP: [],
  notifications: []
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};

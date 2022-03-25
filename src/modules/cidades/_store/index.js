import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  alcadas: [],  
  funcoes_confianca: [],  
  instrumentos: []
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};

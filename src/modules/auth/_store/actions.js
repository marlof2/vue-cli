import api from "../_api";
//const routeMainUsers = "usuarios";

const authenticate = async (context, object) => {
  const result = await api.authenticate(object);
  context.commit("AUTHENTICATED", result.data);
};

// const getUsuariosLdap = async params => {  
//   const result = await api.getUsuariosLDAP(routeMainUsers, params);  
//   //if(result){        
//     console.log("resultado - ",result);
//     //Sreturn result;
//   //}
//   return false;
// };


const getUsuariosLdap = async (context, object) => {
  const result = await api.getUsuariosLdap(object);
  
  //console.log("retorno = ",result.data);
  context.commit("LAST_SEARCH_USUARIO_LDAP", result.data);
  if(result.data){
    return result.data;
  }else{
    return false;
  }
  
};

const setAuthorization = async (context, object) => {
  context.commit("SET_AUTHORIZATION", object);
};

const checkToken = async (context) => {
  const result = await api.checkToken();
  context.commit("AUTHENTICATED", result.data);
};

const logout = async (context) => {
  const result = await api.logout()
  if (result) {
    context.commit("AUTHENTICATED", [])
  }
  return result
}

const getNotifications = async (context) => {
  const result = await api.getNotifications()
  if (result) {
    context.commit("SET_NOTIFICATIONS", result.data)
  }
}

const meInPfo = async ({ commit }, body) => {
  const result = await api.meInPfo(body);
  commit("STORE_ME_IN_PFO", result);
}

export default {
  authenticate,
  checkToken,
  setAuthorization,
  getUsuariosLdap,
  logout,
  getNotifications,
  meInPfo
};

const AUTHENTICATED = (state, authenticated) => {
  state.authenticated = authenticated;
};

const SET_AUTHORIZATION = (state, actualAuthorization) => {
  state.actualAuthorization = actualAuthorization;
};


const LAST_SEARCH_USUARIO_LDAP = (state, usuarioLDAP) => {
  state.usuarioLDAP = usuarioLDAP;
};
// const getUsuariosLdap = (state, usuarioLdap) => {
//   state.usuarioLdap = usuarioLdap.data;
// }

const SET_NOTIFICATIONS = (state, notifications) => {
  state.notifications = notifications;
};

const STORE_ME_IN_PFO = (state, meInPfo) => {
  state.meInPfo = meInPfo
}

export default {
  AUTHENTICATED,
  SET_AUTHORIZATION,
  LAST_SEARCH_USUARIO_LDAP ,
  SET_NOTIFICATIONS,
  STORE_ME_IN_PFO
};

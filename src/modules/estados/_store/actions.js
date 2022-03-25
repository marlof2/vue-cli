import api from "../_api";
const get = async (context, object) => {
  const result = await api.getAlcada(object);
  context.commit("getAlcada", result);
};
const getAlcada = async (context, object) => {
  const result = await api.getAlcada(object);
  context.commit("getAlcada", result);
};
const getInstrumento = async (context, object) => {
  const result = await api.getInstrumento(object);
  context.commit("getInstrumento", result);
};
const getFuncaoConfianca = async (context, object) => {
  const result = await api.getFuncaoConfianca(object);
  context.commit("getFuncaoConfianca", result);
};
const update = async (context, object) => {
  await api.update(object);  
};
const post = async (context, object) => {
  await api.post(object);
};
const inactivateItem = async (context, id) => { 
  await api.inactivateAlcada(id);  
  //context.commit("STORE_ALCADA", result.data);
};
const activeItem = async (context, id) => { 
  await api.activeItemAlcada(id);  
  //context.commit("STORE_ALCADA", result.data);
};

const restoreAlcada = async (context, id) => {  
  await api.restoreAlcada(id);    
};
const deleteItems = async (context, params) => {  
  await api.deleteItems(params);    
  //context.commit("getAlcada", result);

};

export default {
  get,
  post,
  activeItem,
  getAlcada, 
  getInstrumento, 
  getFuncaoConfianca,   
  update,
  inactivateItem,
  restoreAlcada,
  deleteItems,
};

// const get = async (context, object) => { 
//   const result = await api.get(object);
//   context.commit("getTiposProcesso", result);
// };

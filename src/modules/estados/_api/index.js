import Api from "@/api";
//import Jwt from "@/api/jwt";
const routeMain = 'alcada';

const get = async params => { 
    const result = await Api.query(routeMain, params);
    if(result){
      return result;
    }
    return false;
};

const post = async params => {
    const result = await Api.post(routeMain, params);
    if(result){
      return result;
    }
    return false;
};

const update = async params => {
    const id = params.id;
    delete params.id;
    const result = await Api.put(routeMain, id, params);
    if(result){
      return result;
    }
    return false;
};

const deleteItems = async params => {
    const result = await Api.post(`${routeMain}/deleteItems`, params);
    if(result){
      return result;
    }
    return false;
};

const inactivateAlcada = async id => {
    const result = await Api.delete(routeMain, id);
    if(result){
      return result;
    }
    return false;
};
const activeItemAlcada = async id => {
    const result = await Api.post(`${routeMain}/${id}/restore`);
    if(result){
      return result;
    }
    return false;
};

const getAlcada = async params => {
    const result = await Api.query('alcada', params);
    if(result){
      return result;
    }
    return false;
};

const getInstrumento = async params => {
    const result = await Api.query('instrumentos', params);
    if(result){
      return result;
    }
    return false;
};

const getFuncaoConfianca = async params => {
    const result = await Api.query('funcoes_confianca', params);
    if(result){
      return result;
    }
    return false;
};

const getFuncao = async params => {
    const result = await Api.query('funcoes', params);
    if(result){
      return result;
    }
    return false;
};

export default { get, post, update, deleteItems, inactivateAlcada,  activeItemAlcada, getInstrumento, getFuncaoConfianca, getFuncao, getAlcada };

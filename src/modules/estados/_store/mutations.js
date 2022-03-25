const STORE_ALCADA = (state, alcadas) => {
  state.alcadas = alcadas;
};
const getInstrumento = (state, instrumentos) => {
  state.instrumentos = instrumentos.data;
};
const getFuncaoConfianca = (state, funcoes_confianca) => {
  state.funcoes_confianca = funcoes_confianca.data;
};

const getAlcada = (state, alcadas) => {
  state.alcadas = alcadas.data;
};

export default {
  getAlcada,  
  getInstrumento,
  getFuncaoConfianca,
  STORE_ALCADA,
}

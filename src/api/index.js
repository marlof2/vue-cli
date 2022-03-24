import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import storeError from "../modules/error/_store";
import storeRequest from "../modules/request/_store";
import store from "../store";
import Router from "../router";
import Jwt from "./jwt";
// import swal from "sweetalert2";

const Api = {
  init() {
    Vue.use(VueAxios, axios);
    // Vue.use(axios);
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;
    this.setupHeaders();
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;
    Vue.axios.interceptors.response.use(function (response) {
      // store.dispatch("$_error/setErrors", []);
      return response;
    }, this.handleError.bind(this));

    const STORE_KEY_ERROR = "$_error";
    if (!(STORE_KEY_ERROR in store._modules.root._children)) {
      store.registerModule(STORE_KEY_ERROR, storeError);
    }

    const STORE_KEY_REQUEST = "$_request";
    if (!(STORE_KEY_REQUEST in store._modules.root._children)) {
      store.registerModule(STORE_KEY_REQUEST, storeRequest);
    }

    this.addIntercepetRequest();
  },

  async addIntercepetRequest() {
    var numberOfAjaxCAllPending = 0;

    axios.interceptors.request.use(
      async function (config) {
        numberOfAjaxCAllPending++;
        await store.dispatch("$_request/setPending", numberOfAjaxCAllPending);
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      async function (response) {
        numberOfAjaxCAllPending--;
        await store.dispatch("$_request/setPending", numberOfAjaxCAllPending);

        return response;
      },
      async function (error) {
        numberOfAjaxCAllPending--;
        await store.dispatch("$_request/setPending", numberOfAjaxCAllPending);

        return Promise.reject(error);
      }
    );
  },

  setupHeaders() {
    Vue.axios.defaults.headers.common["Content-Type"] = "application/json";
    Vue.axios.defaults.headers.common["Accept"] = "application/json";
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${Jwt.getToken()}`;
    ["get", "post", "put", "patch"].forEach(function (method) {
      Vue.axios.defaults.headers[method]["Content-Type"] = "application/json";
    });
  },
  checkResponse(response) {
    if (!response) {
      return {
        data: "",
        status: 500,
        statusText: "",
      };
    }
    return response;
  },

  async handleError(errRef) {
    if (!errRef.response) {
      return;
    }
    let response = errRef.response;
    let dataResponse = this.checkResponse(response);
    // await store.dispatch("$_error/setErrors", []);

    const code = dataResponse.status ? dataResponse.status : 0;
    var errorMsg = "";
    let typeMessage = "warning";
    if (Object.prototype.hasOwnProperty.call(dataResponse.data, "mensagem"))
      errorMsg = dataResponse.data.mensagem;
    switch (code) {
      case 400:
        this.messageError(dataResponse, dataResponse.data.message);
        break;

      case 0:
      case 401:
        this.messageError(dataResponse, dataResponse.data.message);
        break;

      case 404:
        errorMsg = "Página não encontrada!";
        this.messageError(dataResponse, errorMsg);
        break;

      case 406:
        await store.dispatch(
          "$_error/setErrorsNotAcceptable",
          dataResponse.data
        );
        break;

      case 422:
        console.log("dataResponse.data ", dataResponse.data);
        //await store.dispatch("$_error/setErrors", dataResponse.data);

        if (Object.prototype.hasOwnProperty.call(dataResponse.data, "type")) {
          typeMessage = dataResponse.data.type;
        }

        await store.dispatch("$_messages/setErrors", {
          title: dataResponse.data.title,
          message: dataResponse.data.message,
          type: typeMessage,
          //timeout: 20000
        });
        //this.messageErrorCustom(dataResponse);
        break;

      case 500:
        errorMsg
          ? errorMsg
          : (errorMsg = "Aguarde um pouco e tente novamente.");
        this.messageError(dataResponse, errorMsg, "", "Erro interno");
        break;
    }
    if (code === 406) {
      return new Promise((resolve, reject) => {
        reject(dataResponse);
      });
    }
  },

  messageError(response, errorMsg, timerInterval = "", errorTitle = "") {
    swal.fire({
      type: "error",
      title: errorTitle,
      text: errorMsg,
      // timer: 7000,
      customClass: {
        container: "handler-error",
      },
      onBeforeOpen: () => {
        swal.showLoading();
      },
      onClose: () => {
        clearInterval(timerInterval);
      },
    });

    if (Object.prototype.hasOwnProperty.call(response.data, "status")) {
      if (response.data.status === 401) {
        Jwt.destroyToken();
        Router.push({ name: "autenticacao.login" });
      }
    }
  },

  async query(resource, data) {
    return new Promise((resolve) => {
      const result = Vue.axios.get(resource, { params: data });
      resolve(result);
    });
  },

  get(resource, slug = "") {
    return new Promise((resolve) => {
      const result = Vue.axios.get(`${resource}/${slug}`);
      resolve(result);
    });
  },

  async post(resource, params, options) {
    const result = await Vue.axios.post(
      `${resource}`,
      JSON.stringify(params),
      options
    );
    return result;
  },

  async put(resource, id, params) {
    const result = await Vue.axios.put(
      `${resource}${id ? "/" + id : ""}`,
      JSON.stringify(params)
    );
    return result;
  },

  patch(resource, id, params) {
    return Vue.axios.patch(`${resource}/${id}`, JSON.stringify(params));
  },

  delete(resource, id) {
    return new Promise((resolve) => {
      const result = Vue.axios.delete(`${resource}/${id}`);
      resolve(result);
    });
  },
};
export default Api;

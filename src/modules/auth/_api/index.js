import Api from "@/api";
import Jwt from "@/api/jwt";
const routeMainUsers = 'usuarios';

const authenticate = async (params) => {
    const result = await Api.post("auth/login", params);
    if (result) {
        if (result.data.token) await Jwt.saveToken(result.data.token);

        return result;
    }
    return false;
};


const getUsuariosLdap = async (params) => {
    const result = await Api.query(routeMainUsers, params);
    if (result) {
      return result;
    }
    return false;
};


const checkToken = async () => {
    const result = await Api.query("auth/usuario");
    if (result) {
        if (result.data.token) await Jwt.saveToken(result.data.token);

        return result;
    }
    return false;
};

const enviarEmailComResetSenha = async (params) => {
    const result = await Api.post("senha/email", params);
    if (result) {
        return result;
    }
    return false;
};

const enviarNovaSenha = async (id, params) => {
    const result = await Api.put("senha/trocar", id, params);
    if (result) {
        return result;
    }
    return false;
};

const logout = async () => {
    const result = await Api.query("auth/logout")
    if (result.status == 200) {
        await Jwt.destroyToken()
        return true
    }
    return false
}

const getNotifications = async () => {
    const result = await Api.query("notificacoes")
    if (result) {
        return result;
    }
    return false;
}

const meInPfo = async query => {
    const result = await Api.query(`pfo/auth/me`, query);
    return result.data;
}

export default {
    authenticate,
    checkToken,
    enviarEmailComResetSenha,
    enviarNovaSenha,
    getUsuariosLdap,
    logout,
    getNotifications,
    meInPfo
};

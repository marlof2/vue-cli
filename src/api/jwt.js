import Api from "@/api";
const TOKEN = "token";

export default {
  getToken(tokenGFS) {
    if (tokenGFS) {
      this.saveToken(tokenGFS);
      return tokenGFS;
    }
    return window.localStorage.getItem(TOKEN);
  },

  saveToken(token) {
    window.localStorage.setItem(TOKEN, token);
    Api.init();
  },

  destroyToken() {
    window.localStorage.removeItem(TOKEN);
  }
}
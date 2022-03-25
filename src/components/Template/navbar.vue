<template>
  <div>
    <v-navigation-drawer v-model="drawer" app right>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="white">icon-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text text--darken-1"
              >Minha conta</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon color="white">icon-money-2</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text text--darken-1"
              >Contas a receber</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon color="white">icon-pay</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text text--darken-1"
              >Contas a pagar</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon color="white">icon-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text text--darken-1"
              >Painel Administrativo</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-divider class="menu-divider" color="white"></v-divider>

        <v-list-item link class="menu-sair" @click="doLogout()">
          <v-list-item-action>
            <v-icon color="white">icon-sair</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text text--darken-1">
              Sair
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <router-link to="/">
        <v-icon class="iconSebrae">icon-gfs</v-icon>
        <span class="iconSebrae"></span>
      </router-link>
      <v-spacer></v-spacer>

      <v-icon class="iconSebrae">icon-marca_dagua</v-icon>
      <span class="iconSebrae"></span>

      <v-spacer></v-spacer>
      <avatar />
      <v-toolbar-title
        v-if="Object.prototype.hasOwnProperty.call(authenticated, 'usuario')"
        >{{ authenticated.usuario.nm_usuario }}</v-toolbar-title
      >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import avatar from "./avatarWithNotifications";

export default {
  name: "LayoutsDemosBaselineFlipped",
  props: {
    source: String
  },
  components: {
    avatar
  },
  computed: {
    ...mapGetters({ authenticated: "$_auth/authenticated" })
  },
  data: () => ({
    user: "Sebrae BA",
    userImg: "https://cdn.vuetifyjs.com/images/logos/logo.svg",
    sebraeImg: "img/",
    drawer: false
  }),
  methods: {
    ...mapActions({ logout: "$_auth/logout" }),
    async doLogout() {
      const STORE_KEY = "$_panel";
      if (STORE_KEY in this.$store._modules.root._children) {
        this.$store.commit('$_panel/CLEAR_STATE');
      }

      const response = await this.logout();
      if (response) {
        this.$router.push({ name: "autenticacao.login" });
      }
    }
  }
};
</script>

<style lang="scss">
nav {
  background: #0875ba !important;
}

.icon-marca_dagua {
  font-size: 68px !important;
  left: 1.54%;
  right: 85.43%;
  top: 0%;
  bottom: 2.25%;
  font-size: 65px;
}

.icon-gfs {
  font-size: 100px !important;
  left: 0%;
  right: 85.43%;
  top: 0%;
  bottom: 2.25%;
  font-size: 65px;
}

.menu-divider {
  width: 85%;
  margin: 10px auto;
}

.menu-sair {
  margin-left: 25px;
}
</style>

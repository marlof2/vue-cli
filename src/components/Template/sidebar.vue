<template>
  <v-navigation-drawer :mini-variant="true" app clipped>
    <v-list dense>
      <v-list-item></v-list-item>
      <v-list-item v-for="item in items" :key="item.text">
        <v-list-item-action>
          <router-link :to="{name: item.routeName}">
            <v-icon dark>{{ item.icon }}</v-icon>
          </router-link>
        </v-list-item-action>
        <v-list-item-content>
          <router-link :to="{name: item.routeName}">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn tile outlined color="error" @click="logout()">
          Sair <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import Jwt from "@/api/jwt";

export default {  
  props: ["drawer"],
  data: () => ({
    items: [
      { icon: "trending_up", text: "Criar Chamado", routeName: 'createChamado' },
      { icon: "subscriptions", text: "Gerenciador de Ocorrencias", routeName: 'dashboard' },
      { icon: "people", text: "Gerenciador Usuários", routeName: 'IndexUsuarios' },
      // { icon: "history", text: "History", routeName: 'perfil' }
    ],
    items2: [{ picture: 28, text: "Joseph" }, { picture: 38, text: "Apple" }]
  }),

  methods: {
    logout() {
      Jwt.destroyToken();
      this.$router.push({name: "autenticacao.login"})
    },
  }
};
</script>
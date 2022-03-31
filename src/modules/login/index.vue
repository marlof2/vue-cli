<template>
  <v-app>
    <v-content class="mt-16">
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs10 sm8 md6 lg6>
            <v-card rounded="0" class="elevation-6 pa-6 mx-16">
              <v-img src="../../assets/logo-mini.png" class="logo"></v-img>
              <br />
              <h2>Entrar</h2>
              <v-form>
                <span v-if="!isPassword">
                  <v-text-field name="login" label="E-mail" type="text"></v-text-field>
                  <v-card-text class="pa-0">
                    Não tem uma conta?
                    <a href="#">Crie uma!</a>
                  </v-card-text>
                </span>
                <span v-if="isPassword">
                  <v-text-field name="password" label="Senha" type="password"></v-text-field>
                  <v-card-text class="pa-0">
                    <a href="#">Esqueceu a senha?</a>
                  </v-card-text>
                </span>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark class="back-btn" v-if="isPassword" @click="showPassword">Voltar</v-btn>
                <v-btn
                  dark
                  class="submit-btn"
                  @click="!isPassword ? showPassword() : null"
                >{{ !isPassword ? 'Avançar' : 'Entrar' }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex sm6 md6 lg6 class="d-flex align-center flex-column-reverse">
            <v-card fill dark class="card-color elevation-6 pa-2">
              <v-card-title class="card-title">Título</v-card-title>
              <v-card-text
                class="card-text"
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, suscipit illo atque repudiandae laudantium consectetur cumque autem nam?</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import store from "./_store";

export default {
  name: "loginModule",
  beforeCreate() { },
  data() {
    return {
      isPassword: false,
    };
  },
  beforeMount() { },
  components: {},
  computed: {},
  methods: {
    showPassword() {
      this.isPassword = !this.isPassword;
    }
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
#app {
  background: url("../../assets/background-login.jpg") no-repeat center center
    fixed !important;
  background-size: contain;
}

.logo {
  max-height: 100%;
  max-width: 50%;
  object-fit: contain;
}

.back-btn {
  background-color: #616161 !important;
}

.submit-btn {
  background-color: #4caf50 !important;
}
.card-color {
  background-color: rgba(31, 31, 31, 0.7) !important;
}

.card-text {
  font-size: 18px;
  font-weight: 500;
  color: white !important;
}

.card-title {
  font-size: 26px;
  font-weight: bold;
}
</style>

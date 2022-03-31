<template>
  <v-app>
    <v-content class="mt-16">
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs10 sm8 md6 lg6>
            <v-card rounded="0" class="elevation-6 pa-6 mx-16">
              <v-img src="../../assets/logo-mini.png" class="logo"></v-img>
              <br />
              <h2>{{strings.login}}</h2>
              <v-form>
                <span v-if="!isPassword">
                  <v-text-field name="login" label="E-mail" type="text"></v-text-field>
                  <v-card-text class="pa-0">
                    Não tem uma conta?
                    <a href="#">Crie uma!</a>
                  </v-card-text>
                </span>
                <span v-if="isPassword">
                  <v-text-field name="password" :label="strings.lbl_password" type="password"></v-text-field>
                  <v-card-text class="pa-0">
                    <a href="#">Esqueceu a senha?</a>
                  </v-card-text>
                </span>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <FormButton
                  dark
                  :background="colors.btn_back"
                  :label="strings.btn_back"
                  @click="showPassword"
                  v-if="isPassword"
                />
                <FormButton
                  dark
                  :background="colors.login"
                  :label="!isPassword ? strings.btn_next : strings.login"
                  @click="!isPassword ? showPassword() : null"
                />
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
import FormButton from '../../components/UI/FormButton.vue';
import STRINGS from '../../utils/strings'
import COLORS from '../../utils/colors'

export default {
  name: "loginModule",
  beforeCreate() { },
  created() {
    this.strings = STRINGS;
    this.colors = COLORS;
  },
  data() {
    return {
      isPassword: false,
      strings: null,
      colors: null,
    };
  },
  beforeMount() { },
  components: {
    FormButton,
  },
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

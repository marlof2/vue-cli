<template>
  <v-app>
    <v-content class="mt-16">
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs12 sm9 md7 lg6>
            <v-card  max-width="1200" rounded="0" class="elevation-6 pa-6 mx-16">
              <v-img src="../../assets/logo-mini.png" contain max-height="100%" max-width="50%"></v-img>
              <br />
              <h2>Entrar</h2>
              <v-form>
                <v-text-field name="login" label="E-mail" type="text"></v-text-field>
                <v-card-text class="pa-0">
                  Não tem um conta?
                  <a href="#">Crie uma!</a>
                </v-card-text>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="#4CAF50" to="/">Avançar</v-btn>
              </v-card-actions>
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
    return {};
  },
  beforeMount() { },
  components: {},
  computed: {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
#app {
  background: url("../../assets/background-login.jpg") no-repeat center center
    fixed !important;
  background-size: cover;
}
</style>

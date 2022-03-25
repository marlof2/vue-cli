<template>
  <v-row align="center" justify="center" style="min-height: 80vh" no-gutters>
    <!-- <Snackbar>
      <v-row justify="center">
        <v-col cols="6">
          <v-btn dark block rounded color="#F39C12" x-large
            >IR PARA O MEU E-MAIL</v-btn
          >
        </v-col>
      </v-row>
    </Snackbar> -->
    <v-col lg="4" xl="5" style="text-align: center">
      <v-card class="mx-auto login-card" outlined>
        <v-card-title class="mt-4 no-break">
          Insira seus dados de acesso nos campos abaixo.
        </v-card-title>
        <v-form @submit.prevent="submit" id="login">
          <v-card-text class="text--primary">
            <v-text-field
              v-model.trim="ds_login"
              :error-messages="dsLoginErrors"
              required
              @input="$v.ds_login.$touch()"
              @blur="$v.ds_login.$touch()"
              @focusout="verificarLdap()"
              class="custom-input-outlined"
              label="Seu usuário de rede"
              dense
              outlined
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="ds_senha"
              :error-messages="dsSenhaErrors"
              required
              @input="$v.ds_senha.$touch()"
              @blur="$v.ds_senha.$touch()"
              class="custom-input-outlined"
              label="Sua senha de rede"
              outlined
              dense
            ></v-text-field>
            <v-btn
              type="submit"
              id="login-button-submit"
              rounded
              color="#00AFEF"
              x-large
              block
              class="mb-3"
              >Entrar</v-btn
            >
            <div v-if="this.visualizar_link_recuperacao">
              <v-btn
                text
                v-on:click="recuperarSenha"
                rounded
                color="#00AFEF"
                class="mb-12"
                >Recuperar Senha</v-btn
              >
            </div>
          </v-card-text>
        </v-form>
      </v-card>
      <v-icon size="180px" color="white">icon-logo_sebrae_ba</v-icon>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../_store";
import { required } from "vuelidate/lib/validators";
import authService from "../_api";

export default {
  name: "AuthModule",
  computed: {
    ...mapGetters({ authenticated: "$_auth/authenticated" }),
    dsLoginErrors() {
      const errors = [];
      if (!this.$v.ds_login.$dirty) return errors;
      !this.$v.ds_login.required && errors.push("Usuário é obrigatório.");
      return errors;
    },
    dsSenhaErrors() {
      const errors = [];
      if (!this.$v.ds_senha.$dirty) return errors;
      !this.$v.ds_senha.required && errors.push("Senha é obrigatório.");
      return errors;
    }
  },
  beforeCreate() {
    const STORE_KEY = "$_auth";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  created() {
    this.verificarLdap();
  },
  data: function() {
    return {
      visualizar_link_recuperacao: false,
      status: false,
      loading: false,
      loadingEmail: false,
      ds_login: "",
      ds_senha: "",
      ie_ldap: ""
    };
  },
  validations: {
    ds_senha: { required },
    ds_login: { required }
  },
  beforeMount() {
    this.verificarLdap();
  },
  methods: {
    async submit() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {
        try {
          const response = await this.$store.dispatch("$_auth/authenticate", {
            ds_login: this.ds_login,
            ds_senha: this.ds_senha,
            ie_ldap: this.ie_ldap
          });
          if (typeof response == "undefined") {
            this.loading = false;
          }
        } catch {
          this.loading = false;
        }
        const user = this.$store.getters["$_auth/authenticated"];
        if (user) {
          this.$router.push({ name: "painel" });
        }
      }
    },
    async recuperarSenha() {
      this.$v.ds_login.$touch();
      if (!this.$v.ds_login.$invalid) {
        this.loadingEmail = true;
        await authService.enviarEmailComResetSenha({
          ds_login: this.ds_login
        });
        await this.$store.dispatch("$_messages/setErrors", {
          title: "RECUPERAR SENHA",
          message: `Foi enviado um link contendo instruções de redefinição de senha para
            o seu endereço de e-mail SEBRAE.`,
          type: "warning",
          timeout: 12000
        });
        this.loadingEmail = false;
      }
    },
    async verificarLdap() {
      if (this.ds_login != "") {
        // console.log("LOGIN =",this.ds_login) ;
        this.loadingEmail = true;
        this.loading = true;
        var retorno_AD = await this.$store.dispatch("$_auth/getUsuariosLdap", {
          limit: "-1",
          ds_login: this.ds_login
        });

        console.log("ie_ldap", retorno_AD);
        if (typeof retorno_AD[0] !== "undefined") {
          this.loadingEmail = false;
          this.loading = false;
          this.ie_ldap = retorno_AD[0].ie_ldap;
          if (retorno_AD[0].ie_ldap == "1") {
            this.visualizar_link_recuperacao = false;
            this.loadingEmail = false;
            this.loading = false;
            
          } else {
            this.visualizar_link_recuperacao = true;
            this.loadingEmail = false;
            this.loading = false;
          }
          this.loading = false;
          this.loading = false;
        } else {
          this.visualizar_link_recuperacao = false;
          // return false;
          this.loadingEmail = false;
          this.loading = false;
        }
        // this.ie_ldap =  retorno_AD[0].ie_ldap;
        //  console.log("ie_ldap",retorno_AD[0].ie_ldap);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.no-break {
  word-break: break-word !important;
}
</style>

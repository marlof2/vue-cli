<template>
  <v-row align="center" justify="center" style="min-height: 80vh" no-gutters>
    <v-col lg="4" xl="5" style="text-align: center">
      <v-card class="mx-auto login-card" outlined>
        <v-card-title class="mt-4"> Insira a sua nova senha. </v-card-title>
        <v-form @submit.prevent="submit" id="login">
          <v-card-text class="text--primary">
            <v-text-field
              type="password"
              v-model.trim="ds_senha"
              :error-messages="dsSenhaErrors"
              required
              @input="$v.ds_senha.$touch()"
              @blur="$v.ds_senha.$touch()"
              class="custom-input-outlined"
              label="Sua nova Senha"
              dense
              outlined
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="ds_senha_confirmacao"
              :error-messages="dsSenhaConfirmacaoErrors"
              required
              @input="$v.ds_senha_confirmacao.$touch()"
              @blur="$v.ds_senha_confirmacao.$touch()"
              class="custom-input-outlined"
              label="Confirme sua nova Senha"
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
              class="mb-12"
              >CONFIRMAR</v-btn
            >
          </v-card-text>
        </v-form>
      </v-card>
      <v-icon size="180px" color="white">icon-logo_sebrae_ba</v-icon>
    </v-col>
  </v-row>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";
import authService from "../_api";

export default {
  name: "ResetSenhaComponent",
  computed: {
    dsSenhaConfirmacaoErrors() {
      const errors = [];
      if (!this.$v.ds_senha_confirmacao.$dirty) return errors;
      !this.$v.ds_senha_confirmacao.sameAsPassword &&
        errors.push("As senhas não coincidem.");
      return errors;
    },
    dsSenhaErrors() {
      const errors = [];
      if (!this.$v.ds_senha.$dirty) return errors;
      !this.$v.ds_senha.required && errors.push("Senha é obrigatório.");
      return errors;
    },
  },
  data: function () {
    return {
      ds_senha_confirmacao: "",
      ds_senha: "",
      status: false,
    };
  },
  validations: {
    ds_senha: { required },
    ds_senha_confirmacao: {
      sameAsPassword: sameAs("ds_senha"),
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
       
        var resultado = await authService.enviarNovaSenha(
          this.$route.params.id,
          {
            ds_senha: this.ds_senha,
          }
        );
        if (resultado.status === 200)
          this.$router.push({ name: "autenticacao.login" });

      }
    },
  },
};
</script>
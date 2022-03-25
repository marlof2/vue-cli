<template>
  <div class="status">
    <v-icon large :class="this.corIcone">
      {{ icone }}
    </v-icon>
    <div class="etapa-situacao">
      <p v-if="nomeEtapa" :class="this.corEtapa">{{ nomeEtapa }}</p>
      <p v-if="nomeSituacao" :class="this.corSituacao">
        {{ nomeSituacao }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  props: {
    nomeEtapa: String,
    nomeSituacao: String,
    icone: String,
    corEtapa: String, // classe CSS
    corSituacao: String, // classe CSS
    corIcone: String // classe CSS
  },

  computed: {
    getCssClass() {
      return this.aplicarCss(this.nomeEtapa, this.nomeSituacao);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.status p {
  padding: 1px;
  margin: 0;
}

.v-icon {
  margin: 3px 5px 3px 0;
  padding: 20px 20px 20px 10px;
  width: 26px;
  height: 26px;
}
</style>

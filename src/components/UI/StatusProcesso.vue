<template>
  <div class="status">
    <v-icon large :class="this.getCssClass">
      {{ this.processo.icone }}
    </v-icon>
    <div class="etapa-situacao">
      <p v-if="this.processo.etapa">{{ this.processo.etapa }}</p>
      <p v-if="this.processo.situacao" :class="this.getCssClass">
        {{ this.processo.situacao }}
      </p>
    </div>
  </div>
</template>

<script>
import { processoMixin } from "@/mixins/processo.mixin";

export default {
  name: "StatusProcesso",
  mixins: [processoMixin],
  props: {
    processo: Object
  },
  computed: {
    getCssClass() {
      return this.getCssClassForProcessStatus(
        this.processo.etapa,
        this.processo.situacao
      );
    }
  },
  mounted() {
    if (
      this.processo.etapa == "Cadastro da solicitação" &&
      this.processo.situacao == "Em andamento"
    ) {
      this.processo.situacao = "Rascunho";
      this.processo.icone = "icon-rascunho";
    }
  }
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

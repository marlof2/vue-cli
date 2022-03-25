<template>
  <v-row justify="center">
    <v-dialog v-model="localValue" width="1120px" min-height="500px">
      <v-card style="background-color: white !important; margin: 0 !important;" min-height="500px">
        <v-card-title>
          <v-row>
            <v-col cols="6" sm="6" md="6" style="display: flex; justify-content: flex-start">
              <label class="title">VISUALIZAR PROCESSO</label>
            </v-col>
            <v-col cols="6" sm="6" md="6" style="display: flex; justify-content: flex-end">
              <span class="icon-close close" @click="localValue = false"></span>
            </v-col>
            <v-divider></v-divider>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader
            :loading="loadingProcesso"
            :transition="'scale-transition'"
            height="94"
            type="list-item-two-line"
          >
            <v-row>
              <v-col cols="12" sm="12" md="12" class="no-padding">
                <label class="title-text">Nome do processo:</label>
              </v-col>

              <v-col style="padding-top: 0">
                <label>{{ processo.nm_tipo_processo }}</label>
              </v-col>
            </v-row>
          </v-skeleton-loader>
          <v-skeleton-loader
            :loading="loadingProcesso"
            :transition="'scale-transition'"
            height="94"
            type="list-item-two-line"
          >
            <v-row>
              <v-col cols="12" sm="12" md="12" class="no-padding">
                <label class="title-text">Etapas do processo:</label>
              </v-col>

              <v-col
                cols="6"
                sm="4"
                md="2"
                v-for="(element) in processo.etapas"
                :key="element.nm_etapa_processo"
                style="padding-top: 0"
              >
                <v-chip class="ma-1 btn-drap" label>{{ element.nm_etapa_processo }}</v-chip>
              </v-col>
            </v-row>
          </v-skeleton-loader>

          <v-skeleton-loader
            :loading="loadingProcesso"
            :transition="'scale-transition'"
            height="94"
            type="list-item-two-line"
          > 
            <v-row>
              <v-col cols="12" sm="12" md="12" class="no-padding">
                <label class="title-text">Etapas do checklist:</label>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <div
                  class="btn-drap container-center"
                  style="flex-direction: column; padding-left: 1rem; margin-bottom: 0.5rem"
                  v-for="(tipo_documento) in processo.tipos_documento"
                  :key="tipo_documento.cd_tipo_documento"
                >
                  <span>{{ tipo_documento.nm_tipo_documento }}</span>
                </div>
              </v-col>
            </v-row>
          </v-skeleton-loader>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["value", "data", "cd_tipo_processo"],

  data() {
    return {
      loadingProcesso: null,
      processo: {
        nm_tipo_processo: null,
        etapas: [],
        tipos_documento: [],
      },
    };
  },
  async mounted() {
    if (this.cd_tipo_processo) {
      this.loadingProcesso = await true;
      await this.$store.dispatch("$_tipoProcesso/get", {
        limit: "-1",
        cd_tipo_processo: this.cd_tipo_processo,
      });
      this.loadingProcesso = await false;
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
       set(value) {
        if (!value) {
           this.$store.dispatch("$_tipoProcesso/get", {
            limit: "-1",
          });
        }

        this.$emit("input", value);
      },
    },
    ...mapGetters({
      tiposProcesso: "$_tipoProcesso/tiposProcesso",
    }),
  },
  watch: {
    tiposProcesso: {
      handler: function (newVal) {
       
        if (newVal.length === 1) {
          const processo = newVal[0];
          this.processo.nm_tipo_processo = processo.nm_tipo_processo;
          
          if (Object.prototype.hasOwnProperty.call(processo, "tipos_processo_documento")) {
            
            processo.tipos_processo_documento.forEach((tipo_processo_documento) => {
              this.processo.tipos_documento.push(tipo_processo_documento.tipo_documento);
            });
          }

          if (Object.prototype.hasOwnProperty.call(processo, "tipos_processo_etapas_processo")) {
            processo.tipos_processo_etapas_processo.forEach((element) => {
              this.processo.etapas.push(element.etapa);
            });
          }
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.close:hover {
  opacity: 0.3;
  cursor: pointer;
}
.btn-drap {
  background: #d0f6f9 !important;
  height: 35px;
  border-radius: 7px;
  span {
    color: #444;
  }
}
.title-text {
  font-size: 18px;
  font-weight: bold;
  color: #444;
}
.no-padding {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

::v-deep .v-card__title {
  background: none !important;
  color: black !important;
}
</style>
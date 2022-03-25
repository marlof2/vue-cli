<template>
  <!--  <v-card style="padding: 0 !important; border-radius: 5px !important" class="mx-auto"> -->
  <v-form ref="form" lazy-validation>
    <v-row>
      <v-col cols="12" sm="8" md="8">
        <v-text-field
          v-model="form.nm_tipo_processo"
          label="Nome do tipo de processo *"
          outlined
          :hide-details="this.formValidated && !Object.prototype.hasOwnProperty.call(this.errorsField, 'nm_tipo_processo')"
          :error-messages="Object.prototype.hasOwnProperty.call(this.errorsField, 'nm_tipo_processo') ? this.errorsField.nm_tipo_processo[0] : null"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col 
        class="container-items-center"
          cols="12"
          sm="4"
          md="4"
      >
        <checkbox 
        label="Inativo" v-model="form.deleted_at" type="with-border"
        />
      
 
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <label class="title">Etapas do tipo de processo</label>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div
          class="text-helper"
        >Organize as etapas de projeto arrastando-as para o campo da esquerda, levando em consideração a ordem dos elementos iniciando da esquerda para direita e de cima para baixo.</div>
      </v-col>
    </v-row>
    <v-skeleton-loader
      :loading="loading"
      :transition="'scale-transition'"
      height="94"
      type="list-item-two-line"
    >
      <v-row style="display:flex; justify-content: center">
        <v-col cols="12" sm="6" md="5">
          <div class="box-to-drag">
            <draggable class="row" :list="etapas" group="people" style="min-height: 10rem">
              <v-col
                cols="12"
                sm="6"
                md="6"
                v-for="(element) in etapas"
                :key="element.nm_etapa_processo"
              >
                <v-chip class="ma-1 btn-drap" label>{{ element.nm_etapa_processo }}</v-chip>
              </v-col>
            </draggable>
          </div>
        </v-col>

        <v-col
          cols="12"
          sm="8"
          md="1"
          style="display: flex; justify-content: center; flex-direction: column; align-items:center"
        >
          <div class="setas" @click="selectAll">
            <span @click="selectAll" class="icon-double-arrow-right" style="font-size: 30px" />
          </div>

          <div class="setas" @click="removeAll" style="padding-top: 2rem;">
            <span @click="selectAll" class="icon-double-arrow-left" style="font-size: 30px" />
          </div>
        </v-col>

        <v-col cols="9" sm="8" md="5">
          <div class="box-to-drag">
            <draggable
              class="row"
              style="min-height: 10rem"
              :list="form.tipos_processo_etapas_processo"
              group="people"
            >
              <v-col
                cols="12"
                sm="6"
                md="6"
                v-for="(tipo_processo_etapa_processo) in form.tipos_processo_etapas_processo"
                :key="tipo_processo_etapa_processo.nm_etapa_processo"
              >
                <v-chip class="ma-1 btn-drap-selected" label>{{ tipo_processo_etapa_processo.nm_etapa_processo }}</v-chip>
              </v-col>
            </draggable>
          </div>
        </v-col>
      </v-row>
    </v-skeleton-loader>
    <v-row>
      <v-col cols="10" sm="12" md="12">
        <label class="title">Gerenciar Check List</label>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <!-- <v-row style="padding-bottom: 44px; padding-top: 24px">
      <v-col cols="12" sm="12" md="12">
        <v-btn class="btn-novo-documento">
          Novo Documento
          <span>+</span>
        </v-btn>
      </v-col>
    </v-row>-->

    <v-skeleton-loader
      :loading="loading"
      :transition="'scale-transition'"
      height="94"
      type="list-item-two-line"
    > 
       <div>
    <v-row>
      <v-col class="container-end">
        (
          <span style="color: red">
          *
        </span>
        )Obrigatório
      </v-col>
    
  
    </v-row>
   
      <v-row v-for="tipoDocumento in tiposDocumentoData" :key="tipoDocumento.cd_tipo_documento">
        <v-col
          style="border-radius: 5px 0 0 5px;"
          :class="form.tipos_documento.includes(tipoDocumento.cd_tipo_documento) ? 'checklist checked ' : 'checklist'"
          cols="6"
          sm="6"
          md="6"
        >
          <checkbox
            v-model="form.tipos_documento"
            :valueCheckbox="tipoDocumento.cd_tipo_documento"
            :label="tipoDocumento.nm_tipo_documento"
            type='without-border'
          />
        </v-col>

        <v-col
          style="border-radius: 0 5px 5px 0px; display: flex; justify-content: flex-end; align-items: center"
          :class="form.tipos_documento.includes(tipoDocumento.cd_tipo_documento) ? 'checklist checked ' : 'checklist'"
          cols="6"
          sm="6"
          md="6"
        >
          <v-switch 
           color="#0894C0"
           v-model="tiposDocumentoRequired"
           :value="tipoDocumento.cd_tipo_documento"
           :disabled="!form.tipos_documento.includes(tipoDocumento.cd_tipo_documento)"
         
           ></v-switch>
        </v-col>
      </v-row>
      </div>
    </v-skeleton-loader> 
   
       <v-pagination
      v-model="currentPage"
      :length="lastPage"
      class="pagination"
    ></v-pagination>
   
    <v-row style="padding-bottom: 24px; padding-top: 24px;" class="container-center">
      <v-col cols="4" sm="5" md="1" style="margin-right: 40px">
        <v-btn class="btn-generic-back" :disabled="loading" @click="handlerConsult"> 
          <span style="margin-right: 5px" class="icon-double-arrow-left" />  Voltar
        </v-btn>
      </v-col>
      <v-col cols="4" sm="5" md="1">
        <v-btn class="btn-generic-save" :disabled="loading" @click="save">Concluir</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../_store";
import draggable from "vuedraggable";
import swal from "sweetalert2";
import _ from "lodash";
import checkbox from "../../../components/UI/Checkbox";

export default {
  name: "TipoProcessoModule",

  async beforeCreate() {
    const STORE_KEY = "$_tipoProcesso";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }

    this.loading = await true;
    this.getTiposDocumento();

    await this.$store.dispatch("$_tipoProcesso/getEtapas", {
      limit: "-1",
    });
    if (Object.prototype.hasOwnProperty.call(this.$route.params, "id")) {
      await this.$store.dispatch("$_tipoProcesso/get", {
        limit: "-1",
        cd_tipo_processo: this.$route.params.id,
      });
    }

    this.loading = await false;
  },
  data() {
    return {
      currentPage: 1,
      lastPage: 1,
      loading: null,
      
      formValidated: true,
      tiposDocumentoData: [],
      rules: {
        required: (value) => !!value || "Campo Obrigatório!",
      },
      tiposDocumentoRequired: [],
      etapas: [],
      action: null,
      enabled: true,
      form: {
        cd_tipo_processo: null,
        nm_tipo_processo: null,
        tipos_processo_etapas_processo: [],
        tipos_documento: [],
        deleted_at: null
      },
      dragging: false,
    };
  },
  mounted() {},
  components: {
    draggable,
    checkbox,
  },
  computed: {
    ...mapGetters({
      etapasProcesso: "$_tipoProcesso/etapasProcesso",
      tiposDocumento: "$_tipoProcesso/tiposDocumento",
      tiposProcesso: "$_tipoProcesso/tiposProcesso",
      errorsField: "$_error/errors",
      existError: "$_error/existError",
    }),
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
  },
  methods: {
    async getTiposDocumento(params) {
      await this.$store.dispatch("$_tipoProcesso/getTiposDocumento", params);
   },
    handlerConsult() {
      this.$router.push({
        name: `tipo_processo.index`,
      });
    },
    compare(a, b) {
      if (a.cd_tipo_documento == b.cd_tipo_documento) {
        return 1;
      }
      return 0;
    },
    removeAll() {
      this.form.tipos_processo_etapas_processo.forEach((etapa) => {
        this.etapas.push(etapa);
      });
      this.form.tipos_processo_etapas_processo = new Array();
    },
    selectAll() {
      this.etapas.forEach((etapa) => {
        this.form.tipos_processo_etapas_processo.push(etapa);
      });
      this.etapas = new Array();
    },
    async save() {
      this.formValidated = await this.$refs.form.validate();
      if (!this.formValidated) {
        return false;
      }
      let tipos_processo_etapas_processo = [];
      this.form.tipos_processo_etapas_processo.forEach((tipo_processo_etapa_processo) => {
        tipos_processo_etapas_processo.push(tipo_processo_etapa_processo.cd_etapa_processo);
      });

      let tipos_documento = [];
      this.form.tipos_documento.forEach(cd_tipo_documento => {
          tipos_documento.push({
            cd_tipo_documento: cd_tipo_documento,
            bl_tipo_documento_obrigatorio: this.tiposDocumentoRequired.includes(cd_tipo_documento)
          });
      })

      let deleted_at = null;
      if(this.form.deleted_at) {
        const currentdate = new Date(); 
        const datetime =    currentdate.getFullYear() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        deleted_at = datetime;        
      }

      let dataForm = {
        nm_tipo_processo: this.form.nm_tipo_processo,
        tipos_processo_etapas_processo,
        tipos_documento,
        deleted_at
      };
      
      this.loading = await true;
    
      if (this.form.cd_tipo_processo) {
        dataForm.cd_tipo_processo = this.form.cd_tipo_processo;
        await this.$store.dispatch("$_tipoProcesso/update", {
          ...dataForm,
          id: dataForm.cd_tipo_processo,
        });
      } else {
        await this.$store.dispatch("$_tipoProcesso/post", {
          ...dataForm,
        });
      }
      if (!_.size(this.errorsField)) {
        swal
          .fire({
            type: "success",
            title: "Registro Salvo com Sucesso!",
            text: "Registro Tipo de Processo Salvo com Sucesso!",
            timer: 2000,
            showConfirmButton: false,
            onClose: () => {
              clearInterval("");
            },
          })
          .then((result) => {
            if (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.timer
            ) {

              this.handlerConsult();
            }
          });
      }
      this.loading = await false;
    },
    
    
  },
  watch: {
    currentPage: {
       handler: function (newVal) {
         this.getTiposDocumento({
          page: newVal
        })
      },
    },
    etapasProcesso: {
      handler: function (newVal) {
        this.etapas = newVal;
      },
      deep: true,
    },
    tiposDocumento: {
      handler: function (tiposDocumentoData) {
        this.currentPage = tiposDocumentoData.current_page;
        this.lastPage = tiposDocumentoData.last_page;
        this.tiposDocumentoData = tiposDocumentoData.data;
      },
    },
    tiposProcesso: {
      handler: async function (newVal) {
        if (newVal.length == 1) {
          const etapas = [];
          let etapasVisualizacao = this.etapasProcesso;

          this.form.cd_tipo_processo = newVal[0].cd_tipo_processo;
          this.form.nm_tipo_processo = newVal[0].nm_tipo_processo;
          this.form.deleted_at = Object.prototype.hasOwnProperty.call(newVal[0], 'deleted_at') ? newVal[0].deleted_at != null : false;


          if (Object.prototype.hasOwnProperty.call(newVal[0], "tipos_processo_etapas_processo")) {
            newVal[0].tipos_processo_etapas_processo.forEach((tipo_processo_etapa_processo) => {
              etapas.push(tipo_processo_etapa_processo.etapa);
              etapasVisualizacao = etapasVisualizacao.filter(function (obj) {
                return (
                  obj.cd_etapa_processo !== tipo_processo_etapa_processo.etapa.cd_etapa_processo
                );
              });
              this.form.tipos_processo_etapas_processo = etapas;
              this.etapas = etapasVisualizacao;
            });
          }
          if (Object.prototype.hasOwnProperty.call(newVal[0], "tipos_processo_documento")) {
            const tiposDocumento = [];
            const tiposDocumentoRequired = [];
            newVal[0].tipos_processo_documento.forEach((tipo_processo_documento) => {
              tiposDocumento.push(parseInt(tipo_processo_documento.cd_tipo_documento));
              if(parseInt(tipo_processo_documento.bl_tipo_documento_obrigatorio)) {
                tiposDocumentoRequired.push( parseInt(tipo_processo_documento.cd_tipo_documento));
              }
            });
            //Utilizado para add os checks que estão marcado para acima
            this.tiposDocumentoData = _.sortBy(
              this.tiposDocumentoData,
              function (item) {
                return tiposDocumento.includes(parseInt(item.cd_tipo_documento)) ? 0 : 1;
              }
            );
           
            this.form.tipos_documento = tiposDocumento;
            this.tiposDocumentoRequired = tiposDocumentoRequired;
          }
        }
      },
      deep: true,
    },
  },
};
</script>
  
<style lang="scss" scoped>

.title-action {
  font-weight: normal;
  font-size: 26px;
  line-height: 30px;
}
::v-deep .v-input--selection-controls__ripple {
}
.setas {
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
}
::v-deep .btn-drap {
  background: #d0f6f9 !important;
  padding: 0px 50px 0 50px;
  max-width: 100px;
  .v-chip__content {
    display: flex;
    justify-content: center;
  }
}

::v-deep .btn-drap-selected {
  background: #ccc !important;
  padding: 0px 50px 0 50px;
  max-width: 100px;
  .v-chip__content {
    display: flex;
    justify-content: center;
  }
}
.box-to-drag {
  border: 1px solid #8a8a8a;
  box-sizing: border-box;
  border-radius: 10px;
  min-height: 300px;
}

.checked {
  background: #d0f6f9 !important;
}
.checklist {
  margin-bottom: 0.5rem;
  background: #e9edf4;
  height: 56px;
  box-sizing: border-box;
  border-radius: 7px;
  &:hover {
    //border: 5px solid #d0f6f9;
  }
  input[type="checkbox"]:checked {
    //.primary--text:checked  {

    color: #ffffff !important;
  }
}
.btn-novo-documento {
  background: #d7d2d2 !important;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25) !important;
  border-radius: 40px !important;
  span {
    font-size: 18px;
    line-height: 21px;
  }
}
.text-helper {
  font-size: 19px;
}
.title {
  font-weight: bold;
  font-size: 25px;
  line-height: 29px;
}
.v-card__title {
  padding-left: 2rem;
  background: #0894c0;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 29px;

  color: #ffffff;
}

.v-text-field--outlined fieldset {
  top: -2px !important;
  height: 54px;
  background: #ffffff;
  //border: 1px solid #8a8a8a;
  box-sizing: border-box;
  border-radius: 5px;
}
</style>

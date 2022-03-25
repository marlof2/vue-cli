<template>
  <div>
    <v-row>    
     <v-col cols="4" sm="2" md="4">
        <v-select :items="{getInstrumento}" label="Instrumento" v-model="instrumento" outlined @change="getInstrumento"></v-select>
      </v-col>    
      <v-col cols="4" sm="2" md="4">
          <v-select :items="{getFuncao}" label="Função" v-model="funcao" outlined @change="getFuncao"></v-select>
        </v-col>       
      <v-col cols="4" sm="2" md="4">
        <v-text-field
          clearable
          label="Valor da alçada"
          outlined
          placeholder="alcada"
          hide-details
          v-on:input="pesquisarAlcada"
          v-model="nameAlcada"
        >
          <template v-slot:append>            
            <span class="icon-search" style="color: black; font-size: 1.5rem;" />
          </template>
        </v-text-field>
      </v-col>     
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="12">
        <v-skeleton-loader
          :loading="loadingTable"
          :transition="transition"
          height="94"
          type="list-item-two-line"
        >
        
          <simple-table :data="alcadas" :getData="getAlcada" />
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../_store";
import SimpleTable from "./table";
import _ from "lodash";

export default {
  name: "AlcadaShowwAllModule",
  props: ["data"],

  async beforeCreate() {
    const STORE_KEY = await "$_alcada";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
    
    await this.getAlcada();
    
  },
  data() {
    return {
      nameAlcada: '',
      status: 'Todos',
      cd_tipo_processo: null,
      nm_alcada: "",
      action: null,
      checkbox: false,
      transition: "scale-transition",
      loadingTable: false
    };
  },
  computed: {
    ...mapGetters({
      instrumentos: "$_alcada/alcadas",
    }),
    
  },
  mounted() {},
  components: {
    "simple-table": SimpleTable,
  },
  methods: {
    checkFilter(params) {
     if(this.status == 'Ativo') {
          params.noTrashed = true 
      } else if (this.status == 'Inativo') {
          params.onlyTrashed = true 
      }
      
      params.nm_alcada = this.nameAlcada;
      return params;
    },
   async getAlcada(params) {
     if(typeof params != 'object') {
       params = {};
     }
     await this.checkFilter(params);
     this.loadingTable = await true;
      await this.$store.dispatch("$_alcada/get", params);
      this.loadingTable = await false;
    },
    pesquisarAlcada: _.debounce(async function (nm_alcada) {
      this.loadingTable = true;
      await this.getAlcada({
        nm_alcada: nm_alcada,
      });
      this.loadingTable = false;
    }, 500),
  },
   
};
</script>
 
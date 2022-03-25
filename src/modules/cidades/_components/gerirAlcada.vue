<template>
  <div>       
     <v-row>
      <v-col cols="12" sm="12" md="12">
          <DataTableInlineEdit
            class="base-crud" 
            :hideDefaultHeader="false"
            :featureName="this.$route.matched[0].name"
            :actions="{ delete: true, view: false, edit: true, inativation: true }"
            :headers="headers"
            :items="alcadaTable"
            :editable="addAttr"                                            
            idField="cd_alcada"
            actionItem="$_alcada"
            :structureToAdd="structureAlcada"  
            >
          </DataTableInlineEdit>
      </v-col>
    </v-row> 
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DataTableInlineEdit from "../../../components/UI/DataTableInlineEdit";
import _ from "lodash";
export default {
  name: "AlcadaGerirAlcadaModule",
  props: ["data"],
  async beforeCreate() {
    let i = await null;
    for (i = 9; ++i < 36; ) {
      this.lyrics.push(i.toString(36).toUpperCase());
    }
    //Utilizado para preencher o combo de instrumento
    await this.getInstrumento({ limit: "-1" });    
    await this.getFuncaoConfianca({ limit: "-1" });
   // await this.getAlcada({ limit: "-1" });
    if (!Object.prototype.hasOwnProperty.call(this.$route.query, "withTrashed")) {
      this.$router.push({
        query: {
          ...this.$route.query,
          withTrashed: true,
        },
      });
    } else {      
     /* await this.getInstrumento(this.$route.query);
      await this.getCargo(this.$route.query);  */   
      await this.getAlcada(this.$route.query);
    }    
  },
  data() {
    return {
       
      structureAlcada: {
        nm_instrumento: {
          cd_instrumento: null,
          nm_instrumento: null
        },
        ds_funcao_confianca: {
          cd_funcao_confianca: null,
          ds_funcao_confianca: null
        },
        vl_alcada: null
      },
      alcadaTable: {},
      filter: {        
        cd_alcada: null,
        cd_instrumento: null,
        cd_funcao_confianca: null,
        letra: null,
      },
      //status: "Todos",
      alcadas: {},
      instrumentos: {},
      funcoes_confianca: {},
      instrumentoSelect: [],
      funcaoConfiancaSelect: [],
      perfis: [],
      checkbox: false,
      lyrics: [],
      action: "1",
    addAttr: {
      nm_instrumento: {
        type: "select",
        rules: ['required'],
        editable: true,
        itemValue: 'cd_instrumento',
        itemText: 'nm_instrumento',
        items: [],
        value: null
      },
      ds_funcao_confianca: {
        type: "select",
        editable: true,
        rules: ['required'],
        itemValue: 'cd_funcao_confianca',
        itemText: 'ds_funcao_confianca',
        items: [],
        value: null
      },
      vl_alcada: {
        type: "input",
        editable: true,
        rules: ['required'],
        value: null,
        decimal: true
      },
    },      
    headers: [
      {
        text: "",
        value: "actions",
        class: "header",
        align: "center",
        width: "10%",
      },  
      { text: "Instrumento", value: "nm_instrumento", width: "40%", inline: true },   
      { text: "Função de Confiança", value: "ds_funcao_confianca", width: "40%", inline: true },   
      { text: "Valor da Alçada", value: "vl_alcada", width: "20%", inline: true },   
    ],
    itemsTable: [     
    ],    
    };
  },
  methods: {
    handlerSave() {
    },
    checkFiltersRoute() {
      let query = { ...this.$route.query }; //Object.assign({}, this.$route.query);
      let deleteParam = false;
      if (this.filter.cd_instrumento != null) {
        query = {
          ...query,
          cd_instrumento: this.filter.cd_instrumento,
        };
      } else if (Object.prototype.hasOwnProperty.call(query, "cd_instrumento")) {
        delete query.cd_instrumento;
      }
      if (this.filter.cd_funcao_confianca != null) {
        query = {
          ...query,
          cd_funcao_confianca: this.filter.cd_funcao_confianca,
        };
      } else if (Object.prototype.hasOwnProperty.call(query, "cd_funcao_confianca")) {
        delete query.cd_funcao_confianca;
      }      
      if (deleteParam) {
        this.$router.replace({ query });
      } else {
        this.$router.push({
          query: {
            ...query,
          },
        });
      }
    },
    async getAlcada(params) {
      await this.$store.dispatch("$_alcada/getAlcada", params);
    },    
    async getInstrumento(params) {
      if (Object.prototype.hasOwnProperty.call(params, "cd_instrumento")) {
        this.filter.cd_instrumento = parseInt(params.cd_instrumento);
      }
      await this.$store.dispatch("$_alcada/getInstrumento", params);
    },
    async getFuncaoConfianca(params) {
      if (Object.prototype.hasOwnProperty.call(params, "cd_funcao_confianca")) {
        this.filter.cd_funcao_confianca = parseInt(params.cd_funcao_confianca);
      }
      await this.$store.dispatch("$_alcada/getFuncaoConfianca", params);
    },    
  },
  watch: {
    instrumentosData: {
      handler: function(instrumentos) {
        this.addAttr.nm_instrumento.items = instrumentos;
      }
    },
    funcoes_confiancaData: {
      handler: function(funcoes_confianca) {
        this.addAttr.ds_funcao_confianca.items = funcoes_confianca;
      }
    },
    $route: {
        handler: function (newVal) {
        this.getAlcada(newVal.query);
      },
      
    },
    action: {
      handler: async function () {
        if (
          _.size(this.$route.query) > 1 ||
          !Object.prototype.hasOwnProperty.call(this.$route.query, 'withTrashed')
        )
        await this.$router.replace({ query: { withTrashed: true } });        
        this.filter.cd_instrumento = null;
        this.filter.cd_funcao_confianca = null;         
      },
    },
    alcadaData: {
      handler: function (alcadas) {
       const alcadasData = [];

       if (_.hasIn(alcadas, "data")) {
         alcadas.data.forEach(alcada => {
            alcadasData.push({
              'primaryKey': alcada.cd_alcada,
              'situationItem': alcada.deleted_at == null,
              'nm_instrumento': {
                'cd_instrumento': alcada.alcada_instrumento.cd_instrumento,
                'nm_instrumento':  alcada.alcada_instrumento.nm_instrumento
              },
              'ds_funcao_confianca': {
                'ds_funcao_confianca': (!_.isNull(alcada.alcada_funcao_confianca))? alcada.alcada_funcao_confianca['ds_funcao_confianca'] :'',
                'cd_funcao_confianca': (!_.isNull(alcada.alcada_funcao_confianca))? alcada.alcada_funcao_confianca['cd_funcao_confianca'] :''
              },
              'vl_alcada': alcada.vl_alcada
            })
         });
         this.alcadaTable = {
           data: alcadasData,
           currentPage: alcadas.current_page,
           lastPage: alcadas.last_page
           };
       }
      },
    },    
  },   
  computed: {
    ...mapGetters({
      alcadaData: "$_alcada/alcadas",
      instrumentosData: "$_alcada/instrumentos",
      funcoes_confiancaData: "$_alcada/funcoes_confianca"
    }),
  },
  mounted() {},
  components: {
    DataTableInlineEdit,
  },
};
</script>
<style scoped lang="scss">
.lyric-selected {
  background-color: #0894c0 !important;
  span {
    color: white !important;
  }
}
.title-action {
  font-size: 22px;
  line-height: 30px;
  color: #444444;
}
::v-deep .v-radio {
  label {
    margin-bottom: 0;
  }
}
::v-deep .v-input--radio-group {
  margin-bottom: 0;
}

::v-deep .lyric {
  background: #ffffff;
  border: 1px solid #444444 !important;
  box-sizing: border-box;
  border-radius: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  padding: 2px 5px 2px 5px;
  display: flex;
  justify-content: center;
  span {
    cursor: pointer;
  }
  &:hover {
    opacity: 0.3;
  }
}
</style>
 
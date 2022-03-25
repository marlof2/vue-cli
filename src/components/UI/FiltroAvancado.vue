<template>
  <div>
    <v-btn outlined rounded large class="grey--text text--darken-2 filtro_avancado" @click.stop="drawer = !drawer">
      FILTRO AVANÇADO
      <span style="font-size: 32px" class="icon-Filter"></span>
    </v-btn>
    <v-navigation-drawer
      v-model="drawer"
      class="box-filtro-externa"
      absolute
      temporary
      right
      width="30%"
      :hide-overlay="true"
    >
      <v-list-item class="list-item-filtro">
        <v-list-item-content>
          <v-list-item-title
            ><span style="color:444444; font-size:20px;">FILTRO AVANÇADO</span>
            <i class="icon-close float-right pointer" @click.stop="drawer = !drawer"></i
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-container class="p-4 box-filtro-interna">
        <slot name="conteudoFiltro"></slot>
      </v-container>
      <v-container class="container-botoes-filtro fixed-bottom">
        <v-row class="no-padding-top no-padding-bottom">
          <v-col cols="6" md="6">
            <v-btn rounded block style="background-color:#EEEEEE; color:#444444" @click.stop="$emit('limpar')"
              >LIMPAR CAMPOS</v-btn
            >
          </v-col>
          <v-col cols="6" md="6">
            <v-btn rounded block style="background-color:#0894C0; color:#FFFFFF" @click.stop="$emit('pesquisar')"
              >PESQUISAR</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  },
  async mounted() {},

  methods: {},

  computed: {},
  components: {},

  watch: {
    drawer(value) {
      this.$emit('ocultarBotoes', value)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .filtro_avancado {
  background-color: #eeeeee;
  border: 1px solid #cccccc !important;
}
.pointer {
  cursor: pointer;
}
.fixed-bottom {
  bottom: -12px;
}
</style>

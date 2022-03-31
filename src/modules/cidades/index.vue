<template>
  <div class="mt-10">
    <DataTable :headersProp="headers" :dataProp="data" />
  </div>
</template>

<script>
import store from "./_store";
import DataTable from "../../components/UI/DataTable";

export default {
  nome: "cidadesModule",
  beforeCreate() {},
  data() {
    return {
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "Nome", value: "nome" },
        { text: "Idade", value: "idade" },
        { text: "CPF", value: "cpf" },
        { text: "Nascimento", value: "nascimento" },
        { text: "Sexo", value: "sexo" },
      ],
      data: [
        {
          id: 262,
          nome: "Manuel Renato Brito",
          idade: 36,
          cpf: "351.439.200-51",
          nascimento: "01/03/1986",
          sexo: "Masculino",
        },
        {
          id: 344,
          nome: "Allana Analu Santos",
          idade: 67,
          cpf: "917.216.810-27",
          nascimento: "01/03/1983",
          sexo: "Feminino",
        },
        {
          id: 259,
          nome: "Gabriela Heloísa Nunes",
          idade: 56,
          cpf: "234.306.770-84",
          nascimento: "11/01/1966",
          sexo: "Feminino",
        },
        {
          id: 375,
          nome: "Iago Fábio Gabriel Lima",
          idade: 78,
          cpf: "895.430.860-01",
          nascimento: "02/03/1944",
          sexo: "Masculino",
        },
      ],
    };
  },
  beforeMount() {},
  components: {
    DataTable,
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
</style>

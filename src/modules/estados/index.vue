<template>
  <div>
    <h1>Crud de estados</h1>
    <SimpleTable :headersProp="headers" :dataProp="data" />
  </div>
</template>

<script>
import store from "./_store";
import SimpleTable from "../../components/UI/SimpleTable";

export default {
  name: "estadosModule",
  beforeCreate() {},
  data() {
    return {
      headers: [{ name: "id" }, { name: "descricao" }],
      data: [
        {
          name: "Bahia",
          id: 1,
        },
        {
          name: "Minas Gerais",
          id: 2,
        },
        {
          name: "São Paulo",
          id: 3,
        },
        {
          name: "Rio Grande do Sul",
          id: 4,
        },
        {
          name: "Rio de Janeiro",
          id: 5,
        },
      ],
    };
  },
  beforeMount() {},
  components: {
    SimpleTable,
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
</style>

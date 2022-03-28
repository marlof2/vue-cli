<template>
  <div>
    <h1>Crud de cidades</h1>
    <SimpleTable :headersProp="headers" :dataProp="data" />
  </div>
</template>

<script>
import store from "./_store";
import SimpleTable from "../../components/UI/SimpleTable";

export default {
  name: "cidadesModule",
  beforeCreate() {},
  data() {
    return {
      headers: [{ name: "id" }, { name: "descricao" }],
      data: [
        {
          name: "Salvador",
          id: 1,
        },
        {
          name: "Irecê",
          id: 2,
        },
        {
          name: "Barreiras",
          id: 3,
        },
        {
          name: "Mucugê",
          id: 4,
        },
        {
          name: "Feira de Santana",
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

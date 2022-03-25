<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" v-for="item in headers" :key="item.name">
            {{ item.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.name">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    dataProp: {
      type: Array,
      default: [],
    },
    headersProp: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    this.data = this.dataProp;
    this.headers = this.headersProp;
  },
  data() {
    return {
      data: [],
      headers: [],
    };
  },
};
</script>
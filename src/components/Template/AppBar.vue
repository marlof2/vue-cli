<template>
  <v-app-bar dense app color="green">
    <v-icon size="40" style="margin-left: -9px">mdi-dots-grid</v-icon>
    <v-toolbar-title style="font-size: 12px"
      >PREFEITURA DE
      <div style="font-size: 17px">CAMAÇARI</div></v-toolbar-title
    >
    <v-spacer></v-spacer>
    Paulo Campos
    <v-avatar class="d-flex text-right mx-auto" size="42">
      <v-icon size="35"> mdi-account-circle </v-icon>
    </v-avatar>
    <div class="d-flex align-center"></div>
  </v-app-bar>
</template>

<script>
// import { mdiDotsGrid } from "@mdi/js";
export default {
  data: () => {
    return {
      icons: {
        mdiDotsGrid,
      },
    };
  },
};
</script>

<style></style>

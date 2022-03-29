<template>
  <v-app-bar dense app color="green">
    <v-icon color="white" size="40" style="margin-left: -7px"
      >mdi-dots-grid</v-icon
    >
    <router-link style="textDecoration: none" :to="{ name: 'home' }">
      <v-toolbar-title class="mt-1 text-color-white font"
        >PREFEITURA DE
        <div style="font-size: 17px">CAMAÇARI</div></v-toolbar-title
      >
    </router-link>
    <v-spacer></v-spacer>
    <v-icon class="mr-10" color="white" size="20" style="margin-left: -7px"
      >mdi-cog-outline
    </v-icon>
    <v-avatar class="d-flex text-right mx-auto" size="42">
      <v-icon size="35"> mdi-account-circle </v-icon>
    </v-avatar>
    <div class="text-color-white">Paulo Campos</div>
    <div class="d-flex align-center"></div>
  </v-app-bar>
</template>

<script>
export default {
  data: () => {
    return {};
  },
};
</script>

<style scoped>
.font {
  font-size: 12px;
  margin-left: 10px;
}
.text-color-white {
  color: white;
}
</style>

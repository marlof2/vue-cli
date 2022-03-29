<template>
  <v-app-bar dense app color="green">
    <v-icon color="white" size="40" style="margin-left: -7px"
      >mdi-dots-grid</v-icon
    >
    <v-toolbar-title class="mt-1 text-color-white font"
      >PREFEITURA DE
      <div style="font-size: 17px">CAMAÇARI</div></v-toolbar-title
    >
    <v-spacer></v-spacer>

    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-10"
          size="18"
          icon
          color="white"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="text-color-white">Paulo Campos</div>
    <v-avatar class="d-flex text-right mx-auto" size="42">
      <v-icon size="35"> mdi-account-circle </v-icon>
    </v-avatar>
    <div class="d-flex align-center"></div>
  </v-app-bar>
</template>

<script>
export default {
  data: () => {
    return {
      items: [{ title: "Perfil" }, { title: "Trocar Senha" }],
    };
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

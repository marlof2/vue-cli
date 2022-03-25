<template>
  <v-app>
    <AppBar />
    <v-main>
      <TopBar />
      <v-container fluid>
        <v-row>
          <v-col cols="3">
          <SideBar />
          </v-col>
          <v-col cols="7">
          <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/Template/AppBar";
import SideBar from "./components/Template/SideBar";
import TopBar from "./components/Template/TopBar";
export default {
  name: "App",
  components: {
    AppBar,
    SideBar,
    TopBar,
  },
};
</script>

<template>
  <v-app>
    <v-main v-if="$route.name != 'login'">
      <AppBar />
      <TopBar />
      <v-container fluid>
        <v-row>
          <v-col :cols="sideCols">
            <SideBar @changeColsSideBar="changeColsSideBar" />
          </v-col>
          <v-col :cols="12 - sideCols">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-main v-else>
      <router-view />
    </v-main>
  </v-app>
  <!-- <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>-->
</template>

<script>
import AppBar from "./components/Template/AppBar";
import TopBar from "./components/Template/TopBar";
import SideBar from "./components/Template/SideBar";
export default {
  name: "App",
  components: {
    AppBar,
    SideBar,
    TopBar,
  },
  data() {
    return {
      sideCols: 3,
    };
  },
  methods: {
    changeColsSideBar(show) {
      this.sideCols = show ? 3 : 1;
    },
  },
};
</script>

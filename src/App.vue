<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon />
      <v-spacer></v-spacer>
      <v-avatar class="d-flex text-right mx-auto" size="42">
       <v-icon size="48">
        mdi-account-circle
      </v-icon>
      </v-avatar>
      <div class="d-flex align-center"></div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

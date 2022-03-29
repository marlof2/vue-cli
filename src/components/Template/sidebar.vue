<template>
  <v-navigation-drawer
    color="#eeeeee"
    v-model="drawer"
    :width="drawerSecondary ? 300 : 56"
    absolute
    style="margin-top: 45px"
  >
    <v-navigation-drawer
      v-model="drawer"
      absolute
      color="grey lighten-3"
      mini-variant
    >
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="toggleActive"
            :color="isActive ? 'blue' : `grey darken-1`"
            v-on="on"
            v-bind="attrs"
            class="d-block text-center mx-auto mt-4"
            size="25"
            >mdi-account-circle</v-icon
          >
          <!-- <v-divider class="mx-3 my-5"></v-divider> -->
        </template>
        <span>Perfil</span>
      </v-tooltip>
      <div :class="{ 'active-icon': isActive, 'inactive-icon': !isActive }" />
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="toggleActive"
            :color="isActive ? 'blue' : `grey darken-1`"
            v-on="on"
            v-bind="attrs"
            class="d-block text-center mx-auto mt-4"
            size="25"
            >mdi-medical-bag</v-icon
          >
          <!-- <v-divider class="mx-3 my-5"></v-divider> -->
        </template>
        <span>Medicos</span>
      </v-tooltip>
      <div :class="{ 'active-icon': isActive, 'inactive-icon': !isActive }" />
    </v-navigation-drawer>

    <v-list class="pl-14" shaped v-if="drawerSecondary">
      <v-list-item link>
        <v-icon>mdi-chevron-right </v-icon>
        <v-list-item-content>
          <router-link :to="{ name: 'cidades' }">
            <v-list-item-title>Cidades</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-icon>mdi-chevron-right </v-icon>
        <v-list-item-content>
          <router-link :to="{ name: 'estados' }">
            <v-list-item-title>Estado</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  async mounted() {
    this.$root.$on("toggleDrawerSecondary", () => {
      this.toggleDrawerSecondary();
    });
  },
  data() {
    return {
      isActive: true,
      drawer: true,
      drawerSecondary: true,
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
    toggleDrawerSecondary() {
      this.drawerSecondary = !this.drawerSecondary;
    },
  },
};
</script>

<style>
.v-avatar {
  margin-bottom: 5px;
}

.active-icon {
  width: 80%;
  height: 0.5px;
  margin: 5px 5px 0;
  background-color: blue;
}

.inactive-icon {
  height: 0.5px;
}
</style>

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
          <div
            :class="
              isActive == 'perfil'
                ? 'active-icon-border'
                : `inactive-icon-border`
            "
          >
            <v-icon
              @click="toggleActive('perfil')"
              :color="isActive == 'perfil' ? 'blue' : `grey darken-1`"
              v-on="on"
              v-bind="attrs"
              class="d-block text-center mx-auto mt-4"
              size="25"
              >mdi-account-circle</v-icon
            >
          </div>
        </template>
        <span>Perfil</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <div
            :class="
              isActive == 'medicos'
                ? 'active-icon-border'
                : `inactive-icon-border`
            "
          >
            <v-icon
              @click="toggleActive('medicos')"
              :color="isActive == 'medicos' ? 'blue' : `grey darken-1`"
              v-on="on"
              v-bind="attrs"
              class="d-block text-center mx-auto mt-4"
              size="25"
              >mdi-medical-bag</v-icon
            >
          </div>
        </template>
        <span>Medicos</span>
      </v-tooltip>
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
      isActive: "",
      drawer: true,
      drawerSecondary: true,
    };
  },
  methods: {
    toggleActive(item) {
      this.isActive = item;
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

.active-icon-border {
  border-left: 2px solid blue;
  margin-left: 4px;
  vertical-align: middle;
}

.inactive-icon-border {
  border-left: 2px solid transparent;
  margin-left: 4px;
  vertical-align: middle;
}

.inactive-icon {
  height: 0.5px;
}
</style>

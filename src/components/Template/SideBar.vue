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
      <v-divider></v-divider>
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

    <v-list shaped class="pl-14" v-if="drawerSecondary">
      <v-list-group color="black" :value="false">
        <template v-slot:activator>
          <v-list-item-title class="font-weight-bold"
            >Cadastro</v-list-item-title
          >
        </template>

        <v-list-item
          :class="
            $route.name == 'cidades' ? `active-submenu` : `inactive-submenu`
          "
        >
          <v-icon class="mr-3" size="12">mdi-chevron-right-circle</v-icon>
          <v-list-item-content>
            <router-link
              style="text-decoration: none"
              :to="{ name: 'cidades' }"
            >
              <v-list-item-title class="color-dark">Paciente</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item  :class="
            $route.name == 'estados' ? `active-submenu` : `inactive-submenu`
          ">
          <v-icon class="mr-3" size="12">mdi-chevron-right-circle</v-icon>
          <v-list-item-content>
            <router-link
              style="text-decoration: none"
              :to="{ name: 'estados' }"
            >
              <v-list-item-title class="color-dark">Estados</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item> -->
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  async mounted() {
    console.log(this.$route);
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
      this.$emit("changeColsSideBar", this.drawerSecondary);
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
.color-dark {
  color: black;
}
.active-submenu {
  background-color: #388e3c;
}
.active-submenu .v-list-item__title {
  color: #fff;
}
.active-submenu .v-icon {
  color: #fff;
}
</style>

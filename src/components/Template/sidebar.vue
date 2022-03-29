<template>
  <v-navigation-drawer v-model="drawer" width="300" class="mt-15" absolute>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      color="grey lighten-3"
      mini-variant
    >
      <v-avatar
        class="d-block text-center mx-auto mt-4"
        :color="isActive ? 'blue' : `grey darken-1`"
        size="36"
        @click="toggleActive"
      />
      <div :class="{'active-icon': isActive}" class="inactive-icon"/>
      <v-divider class="mx-3 my-5"></v-divider>

      <v-avatar
        v-for="n in 4"
        :key="n"
        class="d-block text-center mx-auto mb-9"
        color="grey lighten-1"
        size="28"
      ></v-avatar>
    </v-navigation-drawer>

    <v-list class="pl-14" shaped>
      <v-list-item link>
        <v-list-item-content>
          <router-link :to="{ name: 'cidades' }">
            <v-list-item-title>Cidades</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content>
          <router-link :to="{ name: 'estados' }">
            <v-list-item-title>Estado</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="n in 6" :key="n" link>
        <v-list-item-content>
          <v-list-item-title>Item {{ n + 2 }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      drawer: true,
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    }
  },
};
</script>

<style>
.v-avatar{
  margin-bottom: 5px;
}

.active-icon {
  width: 80%;
  height: .5px;
  margin: 5px 5px 0;
  background-color: blue;
}

.inactive-icon {
  height: .5px;
}
</style>
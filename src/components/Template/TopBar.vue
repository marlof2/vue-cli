<template>
  <v-app-bar class="classAppBar" color="#eeeeee" flat height="45">
    <v-icon class="icon" color="gray" size="40"
      >mdi-checkbox-blank-circle
    </v-icon>
    <v-divider class="divider" vertical></v-divider>
    <v-responsive>
      <v-row class="mt-2 mb-2 ml-1">
        <v-app-bar-nav-icon
          class="ml-2"
          @click="$root.$emit('toggleDrawerSecondary')"
        />
        <v-col>
          <div>
            <v-btn elevation="3" rounded small> Novo Médico </v-btn>
            <v-btn class="ml-3" elevation="3" rounded small>
              Novo paciente
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-app-bar>
</template>

<style scoped>
.classAppBar {
  margin-left: -2px;
  border-bottom: 1px #d1d1d1 solid;
  border-top: 1px #d1d1d1 solid;
}

.icon {
  margin-left: -2px;
}
.divider {
  margin-left: 3px;
}
</style>

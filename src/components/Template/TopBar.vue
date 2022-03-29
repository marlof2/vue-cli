<template>
  <v-app-bar flat height="45" style="margin-left: -2px">
    <v-avatar
      class="d-block mx-auto"
      color="grey darken-1"
      size="30"
    ></v-avatar>
    <v-responsive>
      <v-row class="mt-2 mb-2 ml-1">
        <v-app-bar-nav-icon class="ml-2" />
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

<style></style>

<template>
  <v-app-bar
    color="#eeeeee"
    flat
    height="45"
    style="
      margin-left: -2px;
      border-bottom: 1px #d1d1d1 solid;
      border-top: 1px #d1d1d1 solid;
    "
  >
    <v-icon color="gray" size="40" style="margin-left: -7px"
      >mdi-checkbox-blank-circle
    </v-icon>
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

<style></style>

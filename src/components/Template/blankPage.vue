<template>
  <v-app id="inspire">
    <div v-bar style="height: 100vh; display: block; width: auto">
      <div>
        <v-content style="margin: 0px 0px">
          <v-container style="padding: 0px; max-width: 100%">
            <router-view></router-view>
          </v-container>
        </v-content>
      </div>
    </div>
  </v-app>
</template>
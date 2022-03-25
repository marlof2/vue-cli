<template>
  <v-app id="inspire">
    <Navbar v-if="!verifyUserPFO(authenticated)"></Navbar>
    <div v-bar style="height: 100vh; display: block; width: auto">
      <div>
        <v-content>
          <v-container fluid style="max-width: 96%">
            <v-row justify="center" align="center">
              <v-col>
                <router-view></router-view>
              </v-col>
            </v-row>
          </v-container>
        </v-content>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "./navbar";
export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters({
      authenticated: "$_auth/authenticated"
    })
  }
};
</script>

<style lang="scss">
.vb-dragger {
  width: 12px;
  right: 0;
}
.vb-dragger .vb-dragger-styler {
  backface-visibility: hidden;
  transform: rotate3d(0, 0, 0, 0);
  transition: background-color 0.5s ease-out, margin 100ms ease-out,
  height 100ms ease-out;
  background-color: #0875ba;
  margin: 5px 5px 5px 3px;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger .vb-dragger-styler {
  background-color: #0875ba45;
}

.vb-dragger:hover .vb-dragger-styler {
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0px 3px 3px 1px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger .vb-dragger-styler {
  background-color: #0875ba;
  margin: 0px 3px 3px 1px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger .vb-dragger-styler {
  background-color: #0875ba;
}
</style>

<template>
  <v-app id="chamado">
    <div v-bar style="height: 100vh; display: block; width: auto">
      <div>
        <v-main>
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col cols="3">
                <v-img src="../../assets/img/GFS.png" width="250px"></v-img>
              </v-col>
            </v-row>
            <router-view></router-view>
          </v-container>
        </v-main>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
};
</script>
<style lang="scss">
#login {
  padding: 0 !important;
}
#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.acp {
  &:after {
    content: "";
    height: 3px;
    text-align: center;
    display: block;
    left: 33%;
    width: 35%;
    margin-top: 25px;
    position: relative;
    background-color: #ffffff;
  }
}
#login-section {
  text-align: center;
  #login-text {
    color: #444444;
    font-weight: 300;
  }
}

#login-button-submit {
  width: 100%;
  font-size: 1.2rem !important;
  color: #ffffff;

  font-weight: 300;
}
.login-card {
  background: #fffefe !important;
  border: 1px solid #8a8a8a !important;
  box-sizing: border-box !important;
  box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.08) !important;
  border-radius: 5px !important;
  .v-card__title {
    padding-left: 100px;
    padding-right: 100px;
    font-size: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    line-height: 30px;
    text-align: center;
    color: #444444;
  }
  .v-card__text {
    padding-left: 60px;
    padding-right: 60px;
  }
}
</style>

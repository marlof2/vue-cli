<template>
  <div class="main-box">
    <v-row class="container-box">
      <v-col class="box1"></v-col>
      <v-col class="box2"></v-col>
      <v-col class="box3"></v-col>

      <v-row
        justify="center"
        class="loading-text"
      >
        <v-col
					style="display: flex; justify-content: center"
          class="no-padding-bottom no-padding-top"
          cols="12"
          sm="12"
          md="12"
          title="Requisições em processamento"
        >
          <label> Requisições </label>
        </v-col>
        <v-col cols="12" sm="12" md="12" class="info-number">
          <label style="font-size: 15px">
            {{ requestsPending }}
          </label>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    requestsPending: {
				type: Number
		}
	}
}
</script>
<style lang="scss" scoped>
.info-number {
  display: flex;
  justify-content: center;
  padding-top: 0;
  padding-bottom: 0;
  font-weight: bold;
}
.loading-text {
  label {
    font-size: 14px;
  }
	padding-top: 8rem;
}
.main-box {
  background: transparent;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.main-box .container-box {
  width: 112px;
  height: 112px;
  position: absolute;
  z-index: 100;
}

.main-box .container-box .box1,
.main-box .container-box .box2,
.main-box .container-box .box3 {
  border: 16px solid #aaa;
  box-sizing: border-box;
  position: absolute;
  display: block;
}

.main-box .container-box .box1 {
  width: 112px;
  height: 48px;
  margin-top: 64px;
  margin-left: 0px;
  animation: anime1 4s 0s forwards ease-in-out infinite;
}

.main-box .container-box .box2 {
  width: 48px;
  height: 48px;
  margin-top: 0px;
  margin-left: 0px;
  animation: anime2 4s 0s forwards ease-in-out infinite;
}

.main-box .container-box .box3 {
  width: 48px;
  height: 48px;
  margin-top: 0px;
  margin-left: 64px;
  animation: anime3 4s 0s forwards ease-in-out infinite;
}

@-moz-keyframes anime1 {
  0% {
    width: 112px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  25% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  50% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  75% {
    width: 48px;
    height: 112px;
    margin-top: 0px;
    margin-left: 0px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  100% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }
}

@-webkit-keyframes anime1 {
  0% {
    width: 112px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  25% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  50% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  75% {
    width: 48px;
    height: 112px;
    margin-top: 0px;
    margin-left: 0px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  100% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }
}

@-o-keyframes anime1 {
  0% {
    width: 112px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  25% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  50% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  75% {
    width: 48px;
    height: 112px;
    margin-top: 0px;
    margin-left: 0px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  100% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }
}

@keyframes anime1 {
  0% {
    width: 112px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  25% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  50% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }

  75% {
    width: 48px;
    height: 112px;
    margin-top: 0px;
    margin-left: 0px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  100% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }
}

@-moz-keyframes anime2 {
  0% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  25% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  50% {
    width: 112px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  75% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  100% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }
}

@-webkit-keyframes anime2 {
  0% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  25% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  50% {
    width: 112px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  75% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  100% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }
}

@-o-keyframes anime2 {
  0% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  25% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  50% {
    width: 112px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  75% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  100% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }
}

@keyframes anime2 {
  0% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  25% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  50% {
    width: 112px;
    height: 48px;
    margin-top: 0px;
    margin-left: 0px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  75% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  100% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }
}

@-moz-keyframes anime3 {
  0% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  25% {
    width: 48px;
    height: 112px;
    margin-top: 0px;
    margin-left: 64px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  50% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  75% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  100% {
    width: 112px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }
}

@-webkit-keyframes anime3 {
  0% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  25% {
    width: 48px;
    height: 112px;
    margin-top: 0px;
    margin-left: 64px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  50% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  75% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  100% {
    width: 112px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }
}

@-o-keyframes anime3 {
  0% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  25% {
    width: 48px;
    height: 112px;
    margin-top: 0px;
    margin-left: 64px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  50% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  75% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  100% {
    width: 112px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }
}

@keyframes anime3 {
  0% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  12.5% {
    width: 48px;
    height: 48px;
    margin-top: 0px;
    margin-left: 64px;
  }

  25% {
    width: 48px;
    height: 112px;
    margin-top: 0px;
    margin-left: 64px;
  }

  37.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  50% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  62.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  75% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  87.5% {
    width: 48px;
    height: 48px;
    margin-top: 64px;
    margin-left: 64px;
  }

  100% {
    width: 112px;
    height: 48px;
    margin-top: 64px;
    margin-left: 0px;
  }
}
</style>

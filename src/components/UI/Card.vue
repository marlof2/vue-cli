<template>
  <div class="mb-6">
    <v-row v-if="isCrud" style="display: flex" class="mb-12">
      <v-col
        style="display: flex; flex-direction: column; justify-content: center"
        cols="10"
        sm="10"
        md="10"
        class="no-padding-top no-padding-bottom"
      >
        <label class="card-origin">{{ origin }}</label>
        <label class="card-title">{{ modelName }}</label>
      </v-col>
      <v-col
        @click="back"
        cols="2"
        sm="2"
        md="2"
        class="icon-undo-card no-padding-top no-padding-bottom"
      >
        <span class="icon-undo" />
        <span style="font-size: 10px">Voltar</span>
      </v-col>
      <v-col cols="12" sm="12" md="12" class="no-padding-top no-padding-bottom">
        <v-divider style="border: 1px solid #444" class="mx-4"></v-divider>
      </v-col>
    </v-row>

    <v-card :class="isCrud ? 'style-crud' : 'style-no-crud mb-6'">
      <v-row v-if="!isCrud && !isNotExpandable">
        <v-col cols="auto" class="no-padding-right">
          <v-btn class="ml-5" v-if="!isCrud" icon @click="show = !show">
            <v-icon x-large>{{
              show ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto" class="ml-1" align-self="center">
          <label class="card-title-not-crud">{{ modelName }}</label>
        </v-col>
      </v-row>

      <v-expand-transition>
        <div v-show="collapsed ? collapsed : show">
          <v-divider></v-divider>
          <v-card-text v-if="!isCrud" class="accordion">
            <div class="card-body row">
              <MacroFeatures
                v-for="item in listMacroFeatures"
                :key="item[idName]"
                :name="item[itemName]"
                :icon="item[iconName]"
                :url="item[urlName]"
                :exact="exactUrls"
              />
            </div>

            <label v-if="listAdminFeatures.length"
              ><strong style="font-size:1.3rem"
                >Administrativo</strong
              ></label
            >
            <v-divider v-if="listAdminFeatures.length"></v-divider>
            <div class="card-body row">
              <MacroFeatures
                v-for="item in listAdminFeatures"
                :key="item[idName]"
                :name="item[itemName]"
                :icon="item[iconName]"
                :url="item[urlName]"
                :exact="exactUrls"
              />
            </div>
          </v-card-text>
          <v-card-text v-else>
            <slot></slot>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>
<script>
import MacroFeatures from "../../components/UI/MacroFeatures";

export default {
  props: {
    modelName: String,
    backRoute: String,
    listMacroFeatures: Array,
    listAdminFeatures: Array,
    isCrud: Boolean,
    collapsed: Boolean,
    origin: String,
    idName: {
      type: String,
      default: "id"
    },
    itemName: {
      type: String,
      default: "name"
    },
    iconName: {
      type: String,
      default: "icon"
    },
    urlName: {
      type: String,
      default: "url"
    },
    exactUrls: {
      type: Boolean,
      default: false
    },
    isNotExpandable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      if (this.backRoute != "") {
        if(isNaN(this.backRoute)){
          this.$router.push({
          name: this.backRoute
        });
        }else{
          this.$router.go(this.backRoute)
        }
        
      }
    }
  },
  components: {
    MacroFeatures
  },
  data: () => ({
    show: true
  })
};
</script>

<style>
.card-title-not-crud {
  margin-top: 3px;
  margin-bottom: 0rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 29px;
}
/*===Acordeon===*/
.accordion .card {
  border: none;
}
/*.accordion .card-body{padding: 40px 0 20px 0;}*/
.accordion h3 {
  font-size: 15px !important;
  font-weight: 600;
}
.accordion span {
  font-size: 65px;
  text-align: center;
  color: #444;
  display: inline-block;
  width: 100%;
}
.accordion a {
  text-align: center;
  transition: 0.3s;
  margin-bottom: 30px;
}
.accordion h3 {
  transition: 0.3s;
}
.accordion span {
  transition: 0.3s;
}
.accordion a:hover,
.accordion a:hover h3,
.accordion a:hover span {
  text-decoration: none;
  color: #0875ba !important;
}
/*===[FECHA] Acordeon===*/
</style>
<style lang="scss" scoped>
.card-title {
  padding-left: 1rem;
  font-size: 26px !important;
  line-height: 29px !important;
  color: #444 !important;
  margin: 0;
}
.card-title-not-crud {
  font-size: 25px !important;
  line-height: 29px !important;
  color: #fff !important;
}
.icon-undo-card {
  justify-content: flex-end;
  font-size: 24px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  padding-right: 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
}
::v-deep .style-crud {
  border: 1px solid #8a8a8a !important;
  box-sizing: border-box !important;
  box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.08) !important;
  border-radius: 5px !important;
}

.style-no-crud {
  border-radius: 5px !important;
  background-color: #007bc3 !important;
  span {
    color: white;
  }
  .v-icon {
    color: white;
  }
}
.card-origin {
  font-size: 14px;
  padding-left: 1rem;
  color: #8a8a8a;
  margin: 0;
}
</style>
